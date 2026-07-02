# TODO — Refine Comparison & Highlighting Engine

## Milestone 1 — Rendering (Issue 2)
- [x] Stop rendering `referenceReviewParts` / `typedReviewParts` in production UI.
- [x] Ensure Result page uses only `referenceParts` and `typedParts`.

## Milestone 2 — Engine redesign (Issues 1 + correctness)
- [ ] Replace `server/src/utils/comparisonEngine.js` with architecture:
  - tokenizer → word sequence alignment (optimal backtracking) → matched word pairs → character alignment ONLY inside matched pairs → error classification → unified alignment tree → tokens.
- [ ] Enforce strict invariants:
  - Never align characters across different words.
  - Omission recovery preserves alignment after gaps.
  - Local capitalization prefers local match (never skip to later perfect match).

## Milestone 3 — Full-word highlighting (Issue 1)
- [ ] For full-word error categories (spelling, omission, addition, substitution, incompleteWord, repetition, transposition): highlight entire word in both panels.
- [ ] For half/symbol errors (punctuation, spacing, capitalization, transposition, paragraphic): keep character-level/symbol-level highlighting.

## Milestone 4 — Placeholders never leak
- [ ] Guarantee `referenceParts` / `typedParts` never include placeholder glyphs (∅, ␠, ↵).
- [ ] Keep placeholder markers only inside review/debug structures (if retained).

## Milestone 5 — Testing
- [ ] Replace legacy assertions in `server/tests/scoring.test.js` with acceptance criteria for the new engine/spec.
- [ ] Add regression tests for:
  - `A ↔ a` across word boundary (half capitalization)
  - `strong` vs `strog` full-word highlight
  - long omission recovery (`brown` omitted but remainder aligned)
  - repeated words + multiple identical words
  - SSC mode promotion behavior
  - Unicode normalization & Hindi

## Milestone 6 — Verification
- [ ] Run `node --test server/tests/scoring.test.js`
- [ ] Manually verify UI rendering: no ∅/␠/↵ in production.

