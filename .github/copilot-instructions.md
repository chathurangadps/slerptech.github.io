## Purpose

This repository is a minimal, static GitHub Pages site (single-page HTML). These instructions give concise, actionable guidance for AI coding agents to be immediately productive editing, previewing, and extending this codebase.

## Big picture

- What it is: a single static page served from the repository root (`index.html`) and a `CNAME` file for a custom domain.
- Why: lightweight coming-soon landing page with no build step, no package manager, and minimal JS.

## Key files

- `index.html` — single HTML document, inline CSS in the `<head>`, minimal inline JS (auto-updates year). Edit this to change content, layout, or styles.
- `CNAME` — custom domain used by GitHub Pages; do not remove or overwrite unintentionally.

## Local developer workflows (explicit)

- Preview quickly (macOS, zsh):

  python3 -m http.server 8000

  Then open http://localhost:8000/index.html in your browser. (Recommended alternative: VS Code Live Server.)

- Deploy: push to the `main` branch. This repo is a GitHub Pages site hosted from the repository root; pushing to `main` publishes the site. No build step required.

## Project-specific conventions & patterns

- Single-file site: prefer small, self-contained edits in `index.html`. There are no partial templates or build tooling.
- Styling: styles are inline inside the `<style>` tag in `index.html`. When adding larger CSS, consider creating a new file (e.g., `styles.css`) and linking it from `index.html` to keep the HTML readable.
- Forms: the email form uses `action="#"` as a placeholder. Replace with your form provider (Mailchimp, Formspree, or a backend endpoint). No backend exists in this repo.
- JavaScript: only minimal inline script (setting footer year). For additional behavior, add a separate `.js` file and link it.

## Examples (explicit edits)

- Change brand text: edit the `.logo` div content in `index.html`.
- Change countdown values: update the markup inside the `.time-value` elements — they are static numbers (there's no dynamic countdown script).
- Add a new page: create `about.html` at repo root and link it from `index.html`.

## Safety notes

- Do not delete or change `CNAME` unless you intend to change the domain. Removing it can break the custom domain mapping.
- Because there's no CI or tests in this repo, prefer small, reversible commits and open a PR if collaboration is required.

## Suggested commit & PR guidance for the agent

- Make focused changes with descriptive commits (e.g., `fix: update brand text in index.html`).
- For larger UI changes, create a branch and open a PR so maintainers can review visual changes before publishing.

## What I couldn't discover

- No build/test commands or CI configs are present. If you expect a build pipeline, ask the repo owner before adding tooling.

---

If any part of the site or workflow above is incorrect or you'd like more detail (e.g., example form integration, suggested file structure for multiple pages), tell me which area to expand and I will update this file.
