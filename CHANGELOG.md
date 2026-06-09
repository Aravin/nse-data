# Changelog

## Unreleased

- Switched index option-chain requests from `/api/option-chain-indices?symbol=` to `/api/option-chain-contract-info?symbol=` while preserving the exported `indexOptionChain()` response contract.
- Updated the index option-chain e2e test to validate the live contract-info endpoint and the compatibility mapping.
- Switched `indexInfo()` to live NSE endpoints that currently respond: `/api/equity-stock-indices?index=` with breadth data from `/api/equity-stockIndices-adu?index=`.
- Added ESLint, lint-staged, and a Husky `pre-commit` hook for repo-level linting and formatting.