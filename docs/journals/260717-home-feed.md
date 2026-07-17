# Journal — Home Feed (2026-07-17)

## What shipped
First real home page for NoName Forum. Replaced placeholder with a hot-sort feed of posts, added a `/category/[name]` route, wired the Sidebar, and made the `•••` menu author-only.

## Key changes
- **Server** — new `getHotPosts({ limit, offset, category? })` via Prisma `$queryRaw` (single SQLite round-trip, sort by `SUM(Vote.value) DESC, created_at DESC`). `getAllPost` and `getPostById` both gained `commentsCount`. User service `getUserInfo` posts select also extended.
- **Client** — new `lib/{categories,formatDate,getCurrentUser}.ts` (DRY: kills the category map duplicated in `Post.tsx`/`PostTitle.tsx`; also moves `fetchUserData` out of the layout to fix a Next.js layout-export rule). `Post.tsx` renders the `•••` menu only when `currentUserId === author_id`. `PostVotes.tsx` displays score + comment count (display-only, icons disabled). New `PostList.tsx` client island handles "Tải thêm" pagination. New `EmptyState.tsx`. New `app/(main)/category/[name]/{page,not-found}.tsx`. `Sidebar.tsx` uses real `<Link>` destinations.

## Decisions worth remembering
- **No new npm packages.** Stack stays: Next.js 14 App Router + MUI v6 + Tailwind, Fastify 4 + Prisma + SQLite.
- **Pure score, no time decay** (HN-style deferred). `created_at` tie-break keeps ordering deterministic for the all-zero-score early state.
- **Display-only votes on home.** Interactive voting is a separate round; the existing `PostVotes` was a placeholder that we turned into a proper read-only display.
- **Server Component for first paint + client island for "Tải thêm".** Matches the existing `(main)/layout.tsx` RSC pattern. No client-side loading flash.
- **Offset pagination, not keyset.** YAGNI at current scale; documented in plan as future work.

## Issues hit
- The repo's devDependencies were partially installed — `next` and `tsc` binaries missing. Ran `npm install` in both `client/` and `server/` to repair. No `package-lock.json` changes committed (already in sync).
- `getAllPost` and the user service's `posts` select had to be extended to keep `IPost` shape consistent across all routes. The plan flagged this risk; mitigated inline.
- The pre-existing user page passed `created_at` (a string from JSON) into a prop typed as `Date` — surfaced as a TS error once tsc could run. Loosened `Post.created_at` to `string | Date` to cover both the home and the user page without a fake `new Date(...)`.

## Verification
- Client `npm run build` — green, 10 routes including `/category/[name]`.
- Client `npm run lint` — green, 2 pre-existing warnings (AuthorInfo img tag, PostComment useEffect dep).
- Server `tsc` — green, zero output.
- Runtime API smoke — **not run** (no `.env`). Manual test on the user: start server, `curl 'http://localhost:3300/posts?offset=0&limit=5'` should return an array of `{ id, author_id, author_name, avatar_url, title, content, category_name, created_at, score, commentsCount }` ordered by `score DESC, created_at DESC`.

## Follow-ups (deliberately deferred)
- Interactive voting (vote endpoint + optimistic updates).
- Search box wired to `/posts/search`.
- Sort toggle (Hot vs New).
- Keyset cursor once post count grows.
- Category CRUD admin.
- Post edit/delete actions (menu still no-op).
- Tests / CI.
- Time-decay score.
- A real `LOGO` in the Header.
