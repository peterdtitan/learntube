# Tests

| Command | What it checks | Needs |
|---|---|---|
| `npm test` | Unit tests for pure functions in `src/lib` | nothing |
| `npm run test:integration` | Every API route and admin action against a real Postgres | the Docker Postgres |
| `npm run test:e2e` | Main journeys in Chrome, desktop and phone sized | the Docker Postgres, Chrome |
| `node tests/load/run.mjs --users 500` | Many learners at once against a production build | the Docker Postgres |

All of them use their own databases (`learntube_test`, `learntube_e2e`, `learntube_load`),
which they wipe, so your dev data is never touched. Create them once:

```bash
for db in learntube_test learntube_e2e learntube_load; do
  docker exec learntube-postgres psql -U learntube -d learntube -c "CREATE DATABASE $db"
done
```

Browser and load tests build into `.next-e2e` and `.next-load`, so they can run while
`npm run dev` is running.

## Integration tests

`tests/integration` calls the route handlers directly with a pretend session
(`signIn(user)` in `helpers.mjs`). Google sign-in and Vercel Blob are faked; the
database is real and wiped before every test.

## Browser tests

`tests/e2e` seeds three people with ready-made sessions (`signInAs('ada')`), then drives
Chrome through a production build on port 3200. Failures keep a trace:
`npx playwright show-trace test-results/…/trace.zip`.

## Load tests

`tests/load/run.mjs` seeds a catalogue and N learners, starts the servers, and runs three
kinds of learner for 15s ramp + 45s hold:

- half watch lessons (progress saved every 15s, then Try, sometimes a make),
- a third browse (home, pathways, search, makes, leaderboard, profiles),
- a fifth are social (kudos, comments, follows, notifications).

Each page view also makes the calls a real browser does: session, `/api/me`, unread count.

Options: `--users N`, `--instances K` (several servers, like serverless scale-out),
`--pool P` (database connections per server), `--ramp S`, `--hold S`, `--skip-build`,
`--label NAME`. Results land in `tests/load/results/<label>.json`.

To mimic a small Neon compute, cap the Docker database's CPU while it runs:
`docker update --cpus 0.25 learntube-postgres` (afterwards `--cpus 8`, or recreate it).
