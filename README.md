# LearnTube

Free YouTube videos organized into bite-sized, unit-by-unit learning pathways —
pick a skill, follow the units, and pick up where you left off.

Built with Next.js 14 (App Router), NextAuth (Google), Prisma 7, and Postgres.

## Local setup

Requires Node 20+ and Docker.

```bash
npm install
cp .env.example .env.local      # then fill in the Google OAuth values
docker compose up -d            # Postgres on localhost:5433
npx prisma migrate dev          # apply migrations
npm run db:seed                 # sample pathways
npm run dev
```

Open http://localhost:3000/pathways.

For Google sign-in locally, the OAuth client needs `http://localhost:3000` as an
authorized JavaScript origin and
`http://localhost:3000/api/auth/callback/google` as a redirect URI.

## Useful commands

| Command | What it does |
|---|---|
| `npx prisma migrate dev --name <change>` | Create and apply a migration after editing `prisma/schema.prisma` |
| `npx prisma studio` | Browse the database in the browser |
| `docker compose down` | Stop Postgres (data persists in the `learntube-pgdata` volume) |
| `npm run lint` | ESLint (airbnb config) |
