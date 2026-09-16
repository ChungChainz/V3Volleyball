import { GoogleGenAI } from '@google/genai'
import { writeFileSync } from 'node:fs'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const STYLE =
  'Dark grunge sports-poster art. Palette strictly limited to near-black charcoal, deep blood red (#D01018), bright crimson, and brushed metallic silver/chrome. Heavy ink slashes, scratched grain texture, cracked concrete, red smoke and ember sparks, dramatic hard rim lighting, high contrast, cinematic. No text, no words, no letters, no numbers, no logos, no watermarks.'

const jobs = [
  {
    file: 'hero-court.png',
    prompt: `Wide cinematic 16:9 hero image: silhouetted competitive co-ed indoor volleyball players mid-action at the net, one hitter airborne swinging at a spike, blockers rising on the other side, seen from a low dramatic angle. Dark indoor gym bathed in red light, dust and chalk in the air, net in sharp focus. ${STYLE}`,
  },
  {
    file: 'emblem.png',
    prompt: `Centered heraldic sports emblem: a sharp angular chrome shield crest with a stylized volleyball at its center, flanked by two crossed lightning bolts, small crown of spikes above, forged brushed-steel bevels with red enamel inlay, glowing red edge light, on a flat near-black background. Symmetrical, crisp, poster-quality. ${STYLE}`,
  },
  {
    file: 'texture-slash.png',
    prompt: `Wide abstract banner 16:9: aggressive diagonal paint slashes and torn ink streaks across scratched black concrete, red spray and metallic shards, subtle volleyball net shadow pattern woven through. Abstract background texture only, no subject. ${STYLE}`,
  },
  {
    file: 'trophy-shelf.png',
    prompt: `Moody 16:9 still life: a gold championship trophy and a folded black volleyball jersey resting on scratched black concrete, lit from the side by hard red light, red smoke drifting low, volleyball resting beside them in shadow. ${STYLE}`,
  },
]

for (const job of jobs) {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-image',
      contents: job.prompt,
    })
    let saved = false
    for (const part of res.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        writeFileSync(`public/img/${job.file}`, Buffer.from(part.inlineData.data, 'base64'))
        console.log('OK', job.file)
        saved = true
        break
      }
    }
    if (!saved) console.log('NO_IMAGE', job.file)
  } catch (err) {
    console.log('FAIL', job.file, err?.message)
  }
}
