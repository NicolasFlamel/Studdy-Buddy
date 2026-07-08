CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY,
	"score_id" uuid NOT NULL,
	"user_id" uuid NOT NULL UNIQUE,
	"claimed_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" uuid PRIMARY KEY,
	"date" timestamp with time zone NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scores" (
	"id" uuid PRIMARY KEY,
	"subject" text DEFAULT 'vanillaJs' NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "scores_subject_user_id_unique" UNIQUE("subject","user_id"),
	CONSTRAINT "score_check" CHECK ("rating" >= 1 AND "rating" <= 5)
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY,
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "one_claim_per_user_idx" ON "chats" ("claimed_by_user_id") WHERE "claimed_by_user_id" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_score_id_scores_id_fkey" FOREIGN KEY ("score_id") REFERENCES "scores"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_claimed_by_user_id_users_id_fkey" FOREIGN KEY ("claimed_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "scores" ADD CONSTRAINT "scores_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;