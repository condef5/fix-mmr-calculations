import matchResults from './data/matchResult.json';
import users from './data/users.json';

type MatchResult = {
  matchId: string;
  userId: string;
  mmrChange: number;
  completedAt: string;
};

const leaderboardNumber = 10;
const sumMmr = (matchResults: MatchResult[]) =>
  matchResults.reduce((acc, item) => acc + item.mmrChange, 1000);
const usersMap = new Map(users.map((user) => [user.id, user.userName]));

// step 1: group by user Id and matchId, if there is more than one entry
// for a matchId and userId, we need pick the most older completedAt
const grouped: { [key: string]: MatchResult } = {};

for (const matchResult of matchResults) {
  const key = `${matchResult.userId}__${matchResult.matchId}`;
  const previousMatchResult = grouped[key];

  if (!previousMatchResult) {
    grouped[key] = matchResult;
  } else {
    if (
      new Date(previousMatchResult.completedAt) >
      new Date(matchResult.completedAt)
    ) {
      grouped[key] = matchResult;
    }
  }
}

// step 2: group by userId
const groupedByUserId: { [key: string]: MatchResult[] } = {};

for (const matchResult of Object.values(grouped)) {
  const userId = matchResult.userId;
  if (!groupedByUserId[userId]) {
    groupedByUserId[userId] = [matchResult];
  } else {
    groupedByUserId[userId].push(matchResult);
  }
}

// step 3: sum mmr for each user and sort
const sorted = Object.entries(groupedByUserId)
  .map(([userId, matchResults]) => ({
    userId,
    mmr: sumMmr(matchResults),
  }))
  .sort((a, b) => b.mmr - a.mmr);

// step 4: print the top 10 users
console.log(
  sorted.slice(0, leaderboardNumber).map((u) => {
    return {
      userName: usersMap.get(u.userId),
      mmr: u.mmr,
    };
  })
);
