import { useMemo, useState } from 'react';

const moodData = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 74 },
  { day: 'Wed', value: 58 },
  { day: 'Thu', value: 81 },
  { day: 'Fri', value: 76 },
  { day: 'Sat', value: 88 },
  { day: 'Sun', value: 84 },
];

const initialStats = {
  conversations: 128,
  messages: 642,
  usageMinutes: 384,
  journalEntries: 21,
  activeDays: 18,
  currentStreak: 7,
  longestStreak: 14,
};

export function useAnalytics() {
  const [stats] = useState(initialStats);

  const growthScore = useMemo(() => {
    const score =
      stats.activeDays * 2 +
      stats.currentStreak * 3 +
      stats.journalEntries +
      Math.min(stats.conversations / 10, 20);

    return Math.min(Math.round(score), 100);
  }, [stats]);

  const averageMood = useMemo(() => {
    const total = moodData.reduce(
      (sum, item) => sum + item.value,
      0
    );

    return Math.round(total / moodData.length);
  }, []);

  return {
    stats,
    moodData,
    growthScore,
    averageMood,
  };
}
