# review-council audit for local-only use

Scope: read-only audit of https://github.com/WiktorStarczewski/review-council, cloned at commit
74fdbf6 (2026-09-23 04:04 +0200) into
`/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/polish-research/review-council`
(abbreviated `RC/` below). Nothing was installed, run, pushed, or generated. The Arclin repo was
only listed.

## 1. What it is

A Claude Code plugin (and a Codex plugin built from the same tree), not a hosted service and not a
standalone CLI.

- The repo is both a marketplace and the plugin: `RC/.claude-plugin/marketplace.json` points at
  `./plugins/review-council`; `RC/plugins/review-council/.claude-plugin/plugin.json` is the
  manifest (version 0.5.0, MIT, hooks at `./.claude-plugin/hooks.json`). The Codex variant is
  `RC/plugins/review-council/.codex-plugin/plugin.json` plus `codex-skills/`.
- Contents: two skills (`skills/rev/SKILL.md`, 1079 lines, an "executable workflow contract" the
  host session follows step by step; `skills/stack/SKILL.md` for multi-repo stacks), a standing
  policy injected into every session (`skills/rev/POLICY.md`), two subagent definitions
  (`agents/rev-reviewer.md` opus, `agents/rev-reviewer-sonnet.md`; tools `Read, Grep` only,
  `maxTurns: 80`), two hooks (`hooks/session-start`, `hooks/stop-session-guard`), and about
  18,800 lines of bash and stdlib-Python under `scripts/` (largest: `rev-evidence.py` 5254 lines,
  `lib/review-read-audit.py` 2647, `lib/roster.py` 1527, `rev-pr-review.py` 1218).
- Install: `claude plugin marketplace add WiktorStarczewski/review-council` then
  `claude plugin install review-council@review-council` (README.md:69-73), or the curl one-liner
  `RC/install.sh`, which additionally flips `extraKnownMarketplaces.review-council.autoUpdate`
  to `true` in `~/.claude/settings.json` by default (install.sh:34-118, README.md:80-86).
- Invoke: `/review-council:rev [branch|uncommitted|<path>|<branch>|<PR>|<docs>] [rounds] [--read-only]`
  and `/review-council:stack <config>` (README.md:124-150, SKILL.md:39-52).
- Requirements: bash, python3 stdlib, git, ripgrep (`docs/config.md:60`), and signed-in
  provider CLIs. Roster is detected at run time from `codex`, `gemini`, `claude` on PATH
  (`scripts/lib/roster.py:51-52,402-526`). Reviewer seats are spawned as CLI processes:
  `claude -p ... --tools 'Read,Grep' --setting-sources '' --strict-mcp-config`
  (`scripts/seats.d/claude.sh:44-50`), `codex exec --ephemeral -s read-only --output-schema`
  (`seats.d/codex.sh:57-67`), `gemini -p ... --approval-mode plan` (`seats.d/gemini.sh:21`).
- One run produces a session directory outside the repo, `S=/tmp/rev-$(date +%s)`
  (SKILL.md:49-51), containing `scope.env`, `files.txt`, `roster.json`, `00-baseline.patch`,
  `baseline.md`, `findings.md` (ledger), `rejected.md`, `fix-plan.md`, `state.json`, per-seat
  `r<N>-<seat>.{prompt.md,json,log,stream.ndjson,exit,read-audit.json}`, receipts, and
  `report.md` (README.md:633-668, SKILL.md:1052-1058). Unless `--read-only`, it also edits the
  reviewed repo: applies fixes, commits `fix(rev)` commits, squashes them, pushes
  (SKILL.md:902-916), and posts a `COMMENTED` review on the associated open GitHub PR
  (SKILL.md:1021-1033).

## 2. Council semantics

- Seats: three to six. The documented "exact" council is `codex-sol`, `codex-terra` (OpenAI,
  effort max), `opus`, `sonnet` (Anthropic, max); Gemini optional; Grok retired (README.md:7-20).
  Fewer than three detected seats are padded with extra Claude seats and marked `degraded`
  (`docs/config.md:72`).
- Lenses: dealt per round with `seat i gets lenses[(i + N) mod L]` (SKILL.md:515-543). Lens text
  lives in one `case` block in `scripts/rev-prompt.sh:326-350`: correctness, security,
  concurrency, resources, api-contract, performance, tests, observability, readability,
  red-team, regression, simplicity, clean-room, four plan-* lenses, and four "risk bundles"
  (`correctness-boundaries`, `security-state-api`, `concurrency-resources-performance`,
  `tests-observability-maintenance-regression`).
- Schedule: adaptive by default. Simplicity panel on every seat, optional risk-discovery and
  red-team panels for large/high-risk diffs, a plan gate before nontrivial fixes, then a
  four-bundle verification panel; 9 to 17 max-effort seat launches per review (SKILL.md:798-815,
  README.md:275-283). Numeric rounds select a legacy 9-round schedule.
- Output: every seat returns JSON against `schema/findings.schema.json` (severity P0-P3, file,
  line_start/end, claim, evidence, suggested_fix, confidence 0-1).
- Aggregation: no voting. The host session deduplicates across seats, records how many found
  each item ("Found by: ... (2/4)"), opens the cited lines itself, rejects anything it cannot
  substantiate, assigns severity, clusters by root cause (SKILL.md:577-601, 1007-1019).
  Agreement is "signal, not proof" (README.md:44).
- Loop: yes. Repeats plan/fix/verify while a verification panel yields a new or open P0/P1 or
  another nontrivial fix; completes when four bundles are valid, no open P0/P1, gates at
  baseline or better (SKILL.md:870-889). The Stop hook blocks the session from ending a turn
  while `state.json` is not `done`, up to three consecutive blocks (`hooks/stop-session-guard:15-16`).

## 3. Privacy audit

Method: grep of the whole tree (excluding `.git`) for URLs, `urllib|urlopen|fetch|axios|curl|wget|socket`,
telemetry vocabulary (`posthog|sentry|segment|telemetry|analytics|webhook|discord|slack|notion|mixpanel|amplitude|datadog|beacon`),
`WiktorStarczewski`, `gh api|git push|api.github.com`, and filesystem paths outside the repo.

Telemetry, analytics, crash reporting, webhooks, chat integrations: none. The only hits for those
words are the unrelated identifier `segment` in `rev-evidence.py`/`readonly-bash-guard.py`.

Every outbound destination in shipped code:

| # | Destination | Where | When it fires | Data sent |
|---|---|---|---|---|
| 1 | `https://raw.githubusercontent.com/WiktorStarczewski/review-council/main/plugins/review-council/.claude-plugin/plugin.json` | `scripts/lib/update-check.py:23,81` via `hooks/session-start:87-105` | Only if `~/.config/review-council/config.json` has `"check_updates": true` (update-check.py:91; default off, docs/config.md:24). Cached 24h in `~/.cache/review-council/update-check.json` (update-check.py:98-101). | HTTP GET, no body. The author sees no per-request data (GitHub raw has no owner-visible logs), but it is a call to author-controlled content. |
| 2 | `github.com/WiktorStarczewski/review-council` (git clone, then periodic fetch) | `install.sh:30-31`, `install-codex.sh:15-16`, `scripts/lib/set-auto-update.py:24-27` | On install; and forever after if `autoUpdate` was enabled (install.sh default, line 13). | Nothing outbound, but auto-update lets the author's future commits execute in your sessions unreviewed. Supply-chain channel, not data exfiltration. |
| 3 | GitHub API (your account, via `gh`) | `scripts/rev-preflight.sh:53` (`gh pr view` read); `scripts/rev-pr-review.py:390,418,440,459,472,494,870` (`gh pr view`, `gh api ...`, `POST repos/{repo}/pulls/{n}/reviews`) | Read: whenever `gh` is on PATH during preflight. Write: at the end of every completed code review that has an open PR on a GitHub remote (SKILL.md:1021-1033; `docs/pr-review.md:3-5`). Skipped when `NO_PUSH=1` (rev-pr-review.py:829-831) or no GitHub remote matches (rev-pr-review.py:29-34, 383-386). | The full review body is posted publicly on your PR. Body starts with a shields.io badge linking to the author's repo (rev-pr-review.py:201) and ends with a footer "Reviewed by review-council ... " linking to the author's repo (rev-pr-review.py:245). `img.shields.io` is a third-party image fetched by anyone viewing the PR. |
| 4 | `git push` to your origin | SKILL.md:912-913 (after the loop), `rev-squash.sh` | Every non-read-only, non-stack-leg run. | Your commits. |
| 5 | Anthropic, OpenAI, Google provider APIs (through their CLIs) | `seats.d/claude.sh:44`, `seats.d/codex.sh:57,64`, `seats.d/gemini.sh:21`, probes in `roster.py:66-75` | Every panel and every preflight probe. | Diff chunks, literal source packets, and a snapshot of repository instruction files (CLAUDE.md/AGENTS.md) rendered by `rev-prompt.sh:269-...`. Inherent to the tool; not the author. |

Other paths touching outside the reviewed tree (all local):

- `/tmp/rev-*` session dirs (SKILL.md:50); `/tmp/rev-preflight.*` staging (`rev-preflight.sh:110,126`);
  `/tmp/review-council-codex-<uid>-<hash>` private Codex homes with a symlink to your
  `~/.codex/auth.json` (`seats.d/codex.sh:22-46`, `lib/isolated-seat-home.py:20,76-84`; symlink,
  not a copy, dir mode 0700); `/tmp/review-council-stack-*` (`stack.sh:30-31`).
- `~/.cache/review-council/` (update check; provider-contract receipts, `rev-contract-check.py:683-685`).
- `~/.local/state/review-council/` (Stop-hook counter, `hooks/stop-session-guard:22`).
- `~/.claude/settings.json` (install.sh only, line 23).
- Reads: `~/.config/review-council/config.json` (`roster.py:583`), `~/.codex/models_cache.json`
  (`roster.py:407`), `~/.gemini/oauth_creds.json` (`roster.py:441`).
- Author-machine residue: `scripts/stack.sh:25` appends `$HOME/.nvm/versions/node/v22.22.0/bin`
  to PATH. Harmless.
- `eval/cases*.tsv` and `eval/bench-*.sh` reference public `0xMiden/*` repos and call `gh api`;
  eval tooling only, never invoked by the skill.
- `.github/workflows/test.yml` installs `@anthropic-ai/claude-code` and `@openai/codex` in CI;
  CI only.
- Tests use shims on PATH and do not contact providers (`tests/run-tests.sh:2,48`, `docs/seats.md:73`).

Git remotes expected: preflight wants `origin/HEAD` or a local `main`/`master`
(`rev-preflight.sh:40-44`) and refuses to run on a shared branch (`:71`). Publication only
recognises GitHub remote URL shapes (`rev-pr-review.py:29-34`); a non-GitHub or absent remote
skips publication.

Verdict: it can run with zero contact to the author, and zero third-party contact beyond the
model providers you choose, provided you (a) do not install from the marketplace or run
`install.sh` (vendor a local copy instead), (b) leave `check_updates` unset or delete
`update-check.py` and `hooks/session-start:87-112`, and (c) set `NO_PUSH=1` or edit
SKILL.md:1021-1033 so PR publication is not mandatory, and delete the badge/footer at
`rev-pr-review.py:201,245` if you ever do publish. Provider traffic to Anthropic/OpenAI/Google
is unavoidable and is the point of the tool.

## 4. License

MIT, copyright 2026 Wiktor Starczewski (`RC/LICENSE`; `plugin.json:11`). Vendoring, modifying,
and keeping a private adapted copy are permitted; the copyright and permission notice must be
retained in copies or substantial portions. No attribution requirement in generated output; the
badge and footer are the author's default, not a licence term.

## 5. Fit for a marketing-website scorecard

What the tool assumes:

- The unit of review is a git diff of code (`rev-preflight.sh:74-99`), routed by dependency
  components and ripgrep searches (`rev-evidence.py`, README.md:365-380).
- Reviewers see text only: `Read` and `Grep` (`seats.d/claude.sh:45`, `agents/rev-reviewer.md:6`),
  Codex read-only sandbox, Gemini plan mode. No browser, no screenshots, no Lighthouse, no axe.
  The read-audit machinery (`lib/review-read-audit.py`, 2647 lines) certifies a panel only when
  every finding cites a byte range the reviewer actually read; giving seats a browser tool would
  break that certification.
- "Gates" are the project's build/lint/test commands recorded in `baseline.md` (SKILL.md:135-140).
- All lenses are code-defect lenses (`rev-prompt.sh:326-350`). Nothing about visual fidelity,
  design tokens, motion, accessibility, performance budgets, or i18n parity.
- Verification is "does the fix commit cover every sibling site" (SKILL.md:812), not "does the
  page look right".

What the Arclin repo has to plug into: `pnpm lint`, `pnpm build`, Storybook with `@storybook/addon-a11y`,
`playwright` in devDependencies, no test script, one CI workflow `pages.yml`, `.claude/launch.json`
only (listing of `/Users/bs/Develop/Others/Arclin-website`).

Adapting it would mean, at minimum:

1. `scripts/rev-prompt.sh:326-350`: add lenses `fidelity` (compare against a named reference
   site's captured screenshots/DOM), `tokens` (every colour/space/type value resolves to
   `lib/ds/tokens.ts` or `app/globals.css` variables), `motion` (durations/easings/
   `prefers-reduced-motion`, layout shift), `a11y` (WCAG AA from axe output plus source),
   `perf` (Lighthouse/CWV from a report), `i18n` (key parity across `app/[locale]`).
2. `skills/rev/SKILL.md:798-815`: a new panel table using those lenses instead of the four risk
   bundles, and `:870-889` new completion criteria (scorecard thresholds, not "no open P0/P1").
3. `schema/findings.schema.json`: add a `dimension` enum and a per-dimension `score`, or a
   separate `scorecard.schema.json` validated by a copy of `lib/validate-findings.py`.
4. A pre-render step (new script, e.g. `scripts/rev-render-site.sh`) that runs Playwright
   screenshots per breakpoint, axe JSON, Lighthouse JSON, an i18n key diff, and a token-usage
   grep into `$S/`, then feeds them as the document list of a `--read-only` document panel
   (`rev-prompt.sh:67`, SKILL.md:955-975). This is the only route that keeps the shipped
   read-only seat contract intact.
5. `skills/rev/SKILL.md:135-140`: gates become `pnpm lint`, `pnpm build`, `storybook build`,
   a Playwright smoke run, and Lighthouse thresholds.
6. Strips from section 3 (update check, marketplace auto-update, mandatory PR publication,
   badge/footer) and probably `skills/rev/POLICY.md:3`, which routes "any request to review,
   audit, or check code" in every session through this plugin.

That is a rewrite of the parts that give the tool its value (evidence compiler, read audit,
plan gate) for a task those parts were not built for.

## 6. Comparison with what this session already has

- `/code-review` (session skill listing): reviews a diff for correctness bugs at a chosen effort;
  `ultra` runs a multi-agent cloud review. Single lab, diff-oriented, no loop, no fix step.
- Workflow tool (`workflow-authoring` skill, loaded this session): `agent()`/`parallel()`/`pipeline()`
  over subagents with schema-validated output; documented patterns are adversarial verify
  (N skeptics per finding, majority refutes), perspective-diverse verify, judge panel,
  loop-until-dry, completeness critic. Subagents can load any session MCP tool via ToolSearch,
  including the browser tools (`mcp__Claude_Browser__*`, `mcp__claude-in-chrome__*`) and
  `mcp__mobbin__*`, so they can screenshot, run axe/Lighthouse, and compare against a reference
  page. All seats are Anthropic models; `opts.model` changes tier, not lab.

What review-council adds that neither has:

1. Cross-lab decorrelation: OpenAI (and optionally Google) seats reviewing the same evidence
   (`seats.d/codex.sh`, `seats.d/gemini.sh`). This is the one capability the session cannot
   reproduce natively. This machine has `codex` and `gemini` on PATH and a fresh
   `~/.codex/models_cache.json`, so a roster would form.
2. Hash-bound receipts proving each reviewer read the assigned bytes before citing them
   (README.md:503-560).
3. The Stop hook that makes "finish the queue" structural rather than advisory.
4. A plan gate with a mandatory sibling-site search before fixes (README.md:452-500), backed by
   the author's churn measurement (`docs/churn-analysis-2026-09-06.md`).

What it lacks for this task: any way to see the rendered site, any scorecard concept, and it costs
9 to 17 max-effort seat launches per review across two or three paid providers (README.md:275-283).

## 7. Recommendation

Ranked:

A. Build the website council as a Workflow-tool script, and borrow from review-council only the
   Codex seat invocation (`seats.d/codex.sh:64-66`: `codex exec --ephemeral --ignore-user-config
   -s read-only -C "$ROOT" -m <model> --json --output-schema <schema> -o <out> - < prompt`) as one
   extra, non-Anthropic voice per scorecard dimension, plus the findings schema and the
   dedupe/verify/ledger discipline from SKILL.md:577-601. Reason: the scorecard needs
   screenshots, axe, Lighthouse, Mobbin lookups, and i18n diffs, which Workflow subagents can do
   and review-council seats cannot; the adversarial-verify and loop-until-dry patterns cover the
   "council" and "loop" requirements; nothing goes near the author's repo.

B. Vendor `RC/plugins/review-council` into a private location and install it as a local plugin,
   with these strips, for code-diff reviews of the site's TypeScript/CSS only: delete
   `scripts/lib/update-check.py` and `hooks/session-start:87-112`; never run `install.sh`; delete
   `rev-pr-review.py:201` and `:245`; change SKILL.md:1021-1033 so publication is optional and
   run with `NO_PUSH=1`; drop or narrow `skills/rev/POLICY.md:3`. Keep the LICENSE file.
   Reason to rank second: high per-run cost and no visual coverage; useful only for the
   component/TS layer.

C. Install as-is from the marketplace: do not. `install.sh` enables auto-update from the author's
   repo, every completed PR review advertises the author's repo on your public PRs, and
   POLICY.md redirects every review request in every session into this plugin.

Wiktor receives no session data under any of A, B, or C; the concerns in C are supply-chain and
publicity, not exfiltration.

## Risks

- Auto-update (install.sh default) executes the author's future commits in your sessions.
- Mandatory PR publication posts a public review body with an author-branded badge and footer
  unless `NO_PUSH=1` or the skill is edited.
- Non-read-only runs commit, squash, and push to your branch on their own (SKILL.md:902-916).
- The SessionStart hook injects POLICY.md into every Claude Code session, changing how unrelated
  reviews are handled.
- Cost: 9 to 17 max-effort seat launches per review across OpenAI and Anthropic (and Google).
- Codex `auth.json` is symlinked into a `/tmp` private home during seats (0700, symlink only).
- The tool is 18.8k lines of bash/Python tuned to code diffs; adapting it to a visual scorecard
  means rewriting its core, at which point little of the borrowed value remains.
- The Gemini adapter is fixture-tested but "not certified on a live Gemini CLI" (README.md:912-914).

## Sources

- https://github.com/WiktorStarczewski/review-council (commit 74fdbf6)
- RC/LICENSE; RC/README.md; RC/docs/config.md; RC/docs/seats.md; RC/install.sh; RC/install-codex.sh
- RC/.claude-plugin/marketplace.json; RC/plugins/review-council/.claude-plugin/{plugin.json,hooks.json}
- RC/plugins/review-council/skills/rev/{SKILL.md,POLICY.md}; agents/rev-reviewer*.md
- RC/plugins/review-council/hooks/{session-start,stop-session-guard}
- RC/plugins/review-council/scripts/{rev-preflight.sh,rev-prompt.sh,rev-seat.sh,rev-pr-review.py,stack.sh}
- RC/plugins/review-council/scripts/lib/{update-check.py,set-auto-update.py,roster.py,isolated-seat-home.py}
- RC/plugins/review-council/scripts/seats.d/{claude.sh,codex.sh,gemini.sh}
- RC/plugins/review-council/schema/findings.schema.json; docs/pr-review.md; tests/run-tests.sh
- /Users/bs/Develop/Others/Arclin-website/package.json, .claude/launch.json, .github/workflows/pages.yml (listing only)
- workflow-authoring skill text (loaded in this session)
