import Papa from 'papaparse';
import { writeFile } from 'fs/promises';

const csvFilePath = './data/MatchResult.csv';
const jsonFilePath = './data/matchResult.json';

async function convertCSVtoJSON() {
  const file = Bun.file(csvFilePath);
  if (!(await file.exists())) {
    console.error(`File not found: ${csvFilePath}`);
    return;
  }
  const text = await file.text();
  const { data } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  });

  // Only keep required fields and parse types
  const filtered = data.map(row => ({
    matchId: row.MatchId,
    userId: row.UserId,
    mmrChange: Number(row.MmrChange),
    completedAt: row.CompletedAt,
    gameEndReason: row.GameEndReason
  }));

  await writeFile(jsonFilePath, JSON.stringify(filtered, null, 2));
  console.log(`Converted ${filtered.length} rows to ${jsonFilePath}`);
}

convertCSVtoJSON();
