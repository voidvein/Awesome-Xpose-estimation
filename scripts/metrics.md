# Auditable metric snapshots

Run from the project directory:

```sh
python scripts/metrics.py --papers dist/papers.json --out dist/metrics.json
```

For a root-hosted GitHub Pages checkout replace both paths with `papers.json` and `metrics.json`. Default cap: 45 unique GitHub repositories per run. Shared repository links are deduplicated. GitHub's public unauthenticated limit is 60 requests/hour per IP; other jobs share that budget. An optional `GITHUB_TOKEN` environment variable raises the applicable limit; never commit tokens or expose them to client JavaScript. The script stops new requests on 403/429 and retains previous snapshots. It does not retry aggressively.

Add `--citations` only after adding verified `doi` or `openalex` identifiers to paper data. It fetches exact IDs from OpenAlex and stores the returned title for audit. No title-search guesses and no merging preprint/journal citations. OpenAlex citation counts reflect its index, not Google Scholar's. API access/rate plans can change; failures retain earlier values. No key is required for the basic requests currently documented, but current limits should be checked before a bulk run.

`null` is unknown or unavailable, never zero. Every successful metric has its own UTC `checkedAt`, source URL and scope. `generatedAt` is file-generation time, NOT a guarantee that every snapshot was refreshed. Display metric timestamps, especially for preserved older data. Stars on a multi-method framework such as MMPose belong to the entire repository, not the specific paper. Do not sum duplicate repository stars into a corpus popularity total. Citation counts and stars measure different things and should not be ranked together as a quality score.

No download count is collected: repository clone/download traffic is not a universal publicly comparable paper metric. Avoid presenting placeholder zeros. GitHub public API responds with CORS `*` (observed in this run), but a static snapshot is preferable to dozens of per-visitor requests and avoids browser token exposure, API quota exhaustion, and CORS dependence.

## Primary documentation

- https://docs.github.com/en/rest/repos/repos (repository `stargazers_count`, `forks_count`)
- https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
- https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api
- https://help.openalex.org/api/authentication/
- https://help.openalex.org/api/errors/
- https://help.openalex.org/api/llm-quick-reference/ (`cited_by_count`)

Validation: Python compile and URL parser checks passed. This script reads APIs only and writes one local static JSON; it does not publish, change GitHub settings or schedule updates.
