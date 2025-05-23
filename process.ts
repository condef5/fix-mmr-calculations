import matchResults from './data/matchResult.json';

type MatchResult = {
  matchId: string;
  userId: string;
  mmrChange: number;
  completedAt: string;
};

// we need to iterate matchResults, then we need to group by matchId and userId,
// if there is more than one entry for a matchId and userId, we need pick the most older completedAt
// group matches per user first and then apply the pick

// step 1: group by user Id and matchId

const grouped: { [key: string]: MatchResult } = {};

for (const matchResult of matchResults) {
  const key = `${matchResult.userId}__${matchResult.matchId}`;
  const previousMatchResult = grouped[key];

  if (!previousMatchResult) {
    grouped[key] = matchResult;
  } else {
    if (previousMatchResult.completedAt < matchResult.completedAt) {
      grouped[key] = matchResult;
    }
  }
}
