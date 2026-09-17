/*
 * Sheet sync — runs before `vite build`.
 *
 * Pulls the live Google Form response sheets and regenerates the two data
 * files the site reads, so every deploy (including the nightly build hook)
 * reflects whatever has landed in the forms since the last build.
 *
 * Reads a publicly-readable sheet via the gviz CSV endpoint. No API key and
 * no service account required — but the sheets MUST be shared as
 * "Anyone with the link · Viewer" or this script falls back to the last
 * committed snapshot and the build still succeeds.
 *
 * Env:
 *   SKIP_SHEET_SYNC=1   leave the committed snapshots untouched
 */

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dataDir = resolve(here, '../src/data')

const REGISTRATION_SHEET_ID = '1NcwyUv1Gjg-9pITxTyhKLf48xbFS3W7gz7R1fdOV1SM'
const SUB_SHEET_ID = '1bE2LLY3xeykpVeWrt_e9tJByykgPDyxs2dHspylQgkk'

/** Minimal CSV parse that respects quoted fields. */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (char !== '\r') {
      field += char
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((value) => value.trim() !== ''))
}

async function fetchSheet(sheetId) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`
  const response = await fetch(url, { redirect: 'follow' })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const body = await response.text()
  if (body.trimStart().startsWith('<')) throw new Error('sheet is not public')
  return parseCsv(body)
}

/** Build a header-name -> column-index map so renamed columns still work. */
function indexHeaders(headerRow) {
  const map = new Map()
  headerRow.forEach((raw, index) => {
    map.set(raw.trim().toLowerCase(), index)
  })
  return map
}

function cell(row, headers, ...candidates) {
  for (const name of candidates) {
    const index = headers.get(name.toLowerCase())
    if (index !== undefined) {
      const value = row[index]
      if (value !== undefined && String(value).trim() !== '') return String(value).trim()
    }
  }
  return ''
}

function toIso(timestamp) {
  if (!timestamp) return ''
  const parsed = new Date(timestamp)
  return Number.isNaN(parsed.getTime()) ? timestamp : parsed.toISOString().slice(0, 19)
}

async function syncRegistration() {
  const rows = await fetchSheet(REGISTRATION_SHEET_ID)
  if (rows.length < 2) return []

  const headers = indexHeaders(rows[0])
  return rows.slice(1).map((row) => ({
    firstName: cell(row, headers, 'First Name'),
    lastName: cell(row, headers, 'Last Name'),
    teamName: cell(row, headers, 'Teams Name', 'Team Name', 'Team'),
    registeredAt: toIso(cell(row, headers, 'Timestamp')),
  }))
}

async function syncSubs() {
  const rows = await fetchSheet(SUB_SHEET_ID)
  if (rows.length < 2) return []

  const headers = indexHeaders(rows[0])
  return rows
    .slice(1)
    .map((row, index) => ({
      id: `sub-${index + 1}`,
      firstName: cell(row, headers, 'First Name'),
      lastName: cell(row, headers, 'Last Name'),
      teamName: cell(row, headers, 'Team your Subbing For', 'Team your Subbing for'),
      gameDay: cell(
        row,
        headers,
        'What game day your subbing on?',
        'What game day your subbing for?',
      ),
      submittedAt: toIso(cell(row, headers, 'Timestamp')),
    }))
    .filter((entry) => entry.firstName || entry.lastName || entry.teamName)
}

function registrationFile(entries) {
  return `/**
 * Snapshot of the V3 Registration Form responses.
 *
 * GENERATED FILE — regenerated on every deploy by scripts/sync-sheets.mjs.
 * Do not hand-edit; change the form or the sheet instead.
 *
 * Source: "V3 Registration Form (Responses)"
 * https://docs.google.com/spreadsheets/d/${REGISTRATION_SHEET_ID}
 */

export interface RegistrationRow {
  firstName: string
  lastName: string
  teamName: string
  registeredAt: string
}

export const registrationTeams: RegistrationRow[] = ${JSON.stringify(entries, null, 2)}
`
}

function subFile(entries) {
  return `/**
 * Snapshot of the V3 Substitution Form responses.
 *
 * GENERATED FILE — regenerated on every deploy by scripts/sync-sheets.mjs.
 * Do not hand-edit; change the form or the sheet instead.
 *
 * Source: "V3 Substitution From (Responses)"
 * https://docs.google.com/spreadsheets/d/${SUB_SHEET_ID}
 */

export interface SubRequest {
  id: string
  firstName: string
  lastName: string
  teamName: string
  gameDay: string
  submittedAt: string
}

export const subRequests: SubRequest[] = ${JSON.stringify(entries, null, 2)}
`
}

async function main() {
  if (process.env.SKIP_SHEET_SYNC === '1') {
    console.log('SKIP_SHEET_SYNC=1 — leaving committed snapshots in place.')
    return
  }

  try {
    const [registration, subs] = await Promise.all([syncRegistration(), syncSubs()])
    await writeFile(resolve(dataDir, 'registration.ts'), registrationFile(registration))
    await writeFile(resolve(dataDir, 'sub-requests.ts'), subFile(subs))
    console.log(
      `Sheet sync OK — ${registration.length} registration row(s), ${subs.length} sub request(s).`,
    )
  } catch (error) {
    // Never fail the deploy over a sheet problem: the committed snapshot stands.
    console.warn(`Sheet sync skipped (${error.message}) — using committed data.`)
  }
}

main()
