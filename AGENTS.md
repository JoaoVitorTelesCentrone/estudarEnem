# Repository Guidelines

## Project Structure

This repository currently contains a single Portuguese-language site review:

- `Review do Site - Ed Física Sagrado.md` — UX/content audit and improvement roadmap for the Educação Física Sagrado ENEM site at `https://edfisicaensinomedi.wixsite.com/edfisicasagrado`.

There is no application source, package manifest, automated test suite, or build output in the repository. Keep supporting documents at the repository root unless a future change establishes a clearer structure (for example, `docs/` for research and plans).

## Local Development and Validation

No build, test, lint, or development-server commands are configured. Review Markdown changes locally in a Markdown-capable editor and verify:

- headings render in a logical hierarchy;
- tables and fenced code blocks remain readable;
- links, URLs, dates, and claims are accurate;
- Portuguese accents and emoji are saved as UTF-8.

If tooling is added later, document its install, build, lint, and test commands here and in the README.

## Writing Style and Naming

Write documentation in Brazilian Portuguese unless the document explicitly targets another audience. Use concise, descriptive Markdown headings and sentence-style prose. Prefer actionable recommendations, e.g. “Atualize o rodapé para o ano atual,” rather than vague observations.

Use clear filenames that describe the artifact. Preserve existing spaces and accents in filenames; new documents may use lowercase kebab-case where it improves portability, such as `plano-de-implementacao.md`.

## Review and Testing Guidelines

Because this is a documentation repository, the primary quality check is editorial review. Before submitting changes, proofread for encoding issues, broken Markdown tables, outdated dates, and unsupported assertions. When documenting an external website, distinguish observed behavior from recommendations and include the analysis date and URL.

## Commits and Pull Requests

Git history is not available in this checkout, so no repository-specific commit convention can be inferred. Use short, imperative commit subjects such as `docs: update ENEM review recommendations`.

Pull requests should summarize the document changes, identify affected files, link the relevant issue or request when available, and include screenshots only when Markdown rendering or visual layouts changed materially. Explain the evidence behind any new site findings.
