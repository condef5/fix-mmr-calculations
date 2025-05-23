# Calculation Project

This project processes match results and user data, converting CSV files to JSON and calculating leaderboard information.

## Prerequisites

- [Bun](https://bun.sh/) (for running JavaScript/TypeScript)
- Install dependencies as described below

## Project Structure

- `process.ts` — Processes match results and calculates leaderboard data from JSON files.
- `convert.js` — Converts `MatchResult.csv` to `matchResult.json` using PapaParse.
- `data/` — Contains input and output data files:
  - `MatchResult.csv` — Raw match results (CSV)
  - `matchResult.json` — Match results (JSON, generated)
  - `users.json` — User data

## Setup

1. **Install dependencies**

   ```sh
   bun install
   ```

2. **Convert CSV to JSON**

   This step reads `data/MatchResult.csv` and generates `data/matchResult.json`.

   ```sh
   bun run convert.js
   ```

3. **Process the data**

   Run the main calculation script:

   ```sh
   bun run process.ts
   ```

## Notes

- Make sure your `data/MatchResult.csv` and `data/users.json` files are present in the `data/` directory before running the scripts.
- The output will be calculated leaderboard and processed data (edit `process.ts` to customize output).

## Dependencies

- [papaparse](https://www.papaparse.com/) — For CSV parsing
- [bun](https://bun.sh/) — JavaScript runtime

## License

MIT
