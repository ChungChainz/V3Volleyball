CREATE TABLE "match_results" (
	"match_id" text PRIMARY KEY,
	"sets" jsonb DEFAULT '[]' NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
