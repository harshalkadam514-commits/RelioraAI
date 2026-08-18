import { useState } from 'react';

const initialEntries = [
  {
    id: '1',
    mood: 4,
    emotion: 'Calm',
    note: 'Feeling okay today.',
    date: 'Today',
  },
  {
    id: '2',
    mood: 3,
    emotion: 'Thoughtful',
    note: 'Had a lot on my mind.',
    date: 'Yesterday',
  },
];

let moodData = [...initialEntries];

export const emotions = [
  { id: 'happy', label: 'Happy', icon: '😊', value: 5 },
  { id: 'calm', label: 'Calm', icon: '😌', value: 4 },
  { id: 'neutral', label: 'Okay', icon: '🙂', value: 3 },
  { id: 'sad', label: 'Sad', icon: '😔', value: 2 },
  { id: 'angry', label: 'Angry', icon: '😤', value: 2 },
  { id: 'anxious', label: 'Anxious', icon: '😟', value: 2 },
  { id: 'excited', label: 'Excited', icon: '🤩', value: 5 },
  { id: 'tired', label: 'Tired', icon: '🥱', value: 2 },
];

export function getMoodEntries() {
  return [...moodData];
}

export function addMood(entry) {
  const newEntry = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
    ...entry,
  };

  moodData = [newEntry, ...moodData];
  return newEntry;
}

export function deleteMood(id) {
  moodData = moodData.filter((entry) => entry.id !== id);
}

export function clearMoodHistory() {
  moodData = [];
}

export function getMoodAverage() {
  if (!moodData.length) return 0;

  const total = moodData.reduce(
    (sum, entry) => sum + Number(entry.mood || 0),
    0
  );

  return Number((total / moodData.length).toFixed(1));
}

export function useMoodStore() {
  const [entries, setEntries] = useState(moodData);

  const refresh = () => setEntries([...moodData]);

  return {
    entries,
    average: getMoodAverage(),

    addMood: (entry) => {
      const result = addMood(entry);
      refresh();
      return result;
    },

    deleteMood: (id) => {
      deleteMood(id);
      refresh();
    },

    clearMoodHistory: () => {
      clearMoodHistory();
      refresh();
    },
  };
}
