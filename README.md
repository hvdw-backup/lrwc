# LRWC Forum

A private message board for members of LRWC residency programme. The project is part forum for private communication and part experimental piece of webtech for thinking about what the lowest intervention messaging tech could look like - like a postal letter, messages take up to 48hours to be "delivered" (visible to other users) and there are no notifications services; thereby resisting the norms of fast communication tech and it's addictive/stress experience for users. 

The app prioritises privacy: users sign in with and magic link, so no password has to be stored and minimal personal data is required to use the forum. There is also no hierarchy between users, anyone can add someone new to the forum - like the residency programme itself, users can self-organise. The authorization policy reflects this.

## Technology

- Next.js 15 App Router and React 19
- TypeScript
- Auth.js (NextAuth.js v5 beta) with Resend email sign-in
- PostgreSQL and Prisma
- TanStack Query and Axios for client-side mutations
- Tailwind CSS and DaisyUI
- Jest for unit tests

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL for local development (PostgreSQL 16 is used by the local setup)
- Resend API credentials for end-to-end email sign-in

## Local development

Install dependencies:

```bash
npm i
```

The application uses PostgreSQL variables in `prisma/schema.prisma`. For local development, create a database named `lrwc_dev` on a local PostgreSQL server listening on `127.0.0.1:5432`. 

For example, with Postgres.app installed and the development cluster initialized with the `admin` role:

```bash
/Applications/Postgres.app/Contents/Versions/16/bin/createdb \
  -h 127.0.0.1 -p 5432 -U admin lrwc_dev
```

Create `.env.development.local` in the repository root. This file is ignored and should contain local-only values. Use the template in `.env.example`.

Generate a local Auth.js secret with:

```bash
openssl rand -hex 32
```

`POSTGRES_PRISMA_URL` is Prisma's connection URL; `POSTGRES_URL_NON_POOLING` is its direct connection URL. Both must target the local database during local development. `AUTH_URL` makes Auth.js build magic links for localhost instead of the production domain. Never put production credentials in a committed file or point local development at the production database.

If the local database is empty, generate the Prisma client and synchronize the schema. 

**Important:** Prisma CLI reads `.env`, while Next.js development loads `.env.development.local`. Always set both database URLs explicitly for Prisma commands so they cannot accidentally target the database in `.env`:

```bash
npx prisma generate
POSTGRES_PRISMA_URL='postgresql://admin@127.0.0.1:5432/lrwc_dev?schema=public' \
POSTGRES_URL_NON_POOLING='postgresql://admin@127.0.0.1:5432/lrwc_dev?schema=public' \
  npx prisma db push
```

On the original development machine, the local PostgreSQL 16 cluster can be
started and stopped with:

```bash
/Applications/Postgres.app/Contents/Versions/16/bin/pg_ctl \
  -D "$HOME/Library/Application Support/Postgres/var-16" \
  -l "$HOME/Library/Logs/PostgresApp/lrwc-dev.log" \
  -o "-h 127.0.0.1 -p 5432" start
/Applications/Postgres.app/Contents/Versions/16/bin/pg_ctl \
  -D "$HOME/Library/Application Support/Postgres/var-16" stop
```

Check that it is accepting local connections with
`/Applications/Postgres.app/Contents/Versions/16/bin/pg_isready -h 127.0.0.1 -p 5432`.

This repository's historical Prisma migrations do not cleanly represent the
current schema. `prisma db push` is currently used to set up a local database;
review and reconcile the migration history before using migrations for a
production schema change. No seed script is currently provided.

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The local PostgreSQL
server must be running first. Useful database commands:

```bash
npx prisma generate
POSTGRES_PRISMA_URL='postgresql://admin@127.0.0.1:5432/lrwc_dev?schema=public' \
POSTGRES_URL_NON_POOLING='postgresql://admin@127.0.0.1:5432/lrwc_dev?schema=public' \
  npx prisma studio
```

### Local database snapshot

The local development database on the original development machine was initially copied from production. It is an independent local database, but its contents may include real member information and forum posts. Treat it as sensitive: do not commit, upload, or share database dumps or credentials. Do not create another production copy without authorization. The production database should never be used as the local development database.

## Authentication and access

- Auth.js handles authentication at `/api/auth/[...nextauth]`.
- Sign-in is by email magic link through Resend. The sender address is configured in `src/auth.ts`; the sending domain must be verified with Resend.
- Only addresses in the `ApprovedUsers` table are accepted by the sign-in action.
- A successful sign-in creates or updates a user record. Members can add a username and profile text on `/update-user-details`.
- `/message-board` requires a signed-in session.
- `/approve-user` is the member administration page.
- `/verify-request` is the custom “check your email” page.

### Access model

This app intentionally does not implement a separate admin/owner hierarchy for everyday forum activity. Authenticated users are treated as peers for creation, editing, and deletion of posts and replies; the server still requires a valid session and rejects malformed request payloads, but it does not distinguish between ordinary members and administrators for the default forum experience.


For local email sign-in, provide a Resend key and use an approved email address.

The link should return to `localhost:3000`; use a newly requested link for each sign-in attempt.

## Main routes

| Path | Purpose |
| --- | --- |
| `/` | Forum landing page |
| `/sign-in` | Email sign-in form |
| `/verify-request` | Magic-link confirmation page |
| `/message-board` | Signed-in forum posts and replies |
| `/update-user-details` | Update the signed-in member's profile |
| `/approve-user` | Manage approved addresses and view members |

## API routes

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/auth/[...nextauth]` | `GET`, `POST` | Auth.js handlers |
| `/api/posts/create` | `POST` | Create a post |
| `/api/posts/[postid]` | `GET`, `PATCH`, `DELETE` | Read, update, or delete a post |
| `/api/replies/create` | `POST` | Create a reply |
| `/api/replies/[replyid]` | `GET`, `PATCH`, `DELETE` | Read, update, or delete a reply |
| `/api/approved-user/create` | `POST` | Add an approved email |
| `/api/approved-user/[userid]` | `DELETE` | Remove an approved email |

## Data model

The Prisma schema is in `prisma/schema.prisma`.

- `ApprovedUsers`: email addresses permitted to sign in.
- `User`: member identity and profile, including username, about text, and redeemed status.
- `Post`: forum post content, author, creation time, and scheduled read time.
- `Reply`: reply content, parent post, author, creation/update times, and scheduled read time.
- `Account`, `Session`, `VerificationToken`: Auth.js adapter models.

Post and reply read times are stored as millisecond timestamps encoded as strings. `src/app/lib/timeHelpers.ts` creates the randomized release time and computes visibility and remaining hours. 

`isReadyToRead` returns true only once the scheduled read time has been reached or passed. Posts and replies remain hidden until that time, then render normally. The countdown UI uses `normaliseTime` and `getRemainingHours` to show how long remains before the content becomes visible.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm test` | Run Jest tests |
| `npm run lint` | Run Next.js ESLint checks |
| `npx tsc --noEmit` | Run the TypeScript checker |

Run one Jest file with:

```bash
npm test -- --runInBand src/app/lib/timeHelpers.test.ts
```

Jest configuration is in `jest.config.js`. Current unit tests cover email
validation (`src/app/lib/helpers.test.ts`) and time helpers
(`src/app/lib/timeHelpers.test.ts`).

## Project layout

```text
prisma/
  schema.prisma       Database models
  migrations/         Historical Prisma migrations
src/
  auth.ts             Auth.js configuration
  app/
    api/              Auth, post, reply, and approved-user route handlers
    components/       Forum pages and reusable UI/forms
    lib/              Data actions and helper functions
    <page>/           App Router pages
jest.config.js        Jest setup using the Next.js transformer
```

