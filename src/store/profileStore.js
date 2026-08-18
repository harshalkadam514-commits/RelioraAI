import { useState } from 'react';

let profile = {
  name: '',
  nickname: '',
  birthday: '',
  interests: [],
  goals: [],
  communicationStyle: 'Natural',
  aiPersonality: 'Warm',
  relationshipType: 'Companion',
  customInstructions: '',
};

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener(profile));
}

export function getProfile() {
  return { ...profile };
}

export function updateProfile(updates) {
  profile = {
    ...profile,
    ...updates,
  };

  notify();
  return { ...profile };
}

export function useProfileStore() {
  const [data, setData] = useState({ ...profile });

  const update = (updates) => {
    const result = updateProfile(updates);
    setData(result);
    return result;
  };

  return {
    profile: data,
    update,
  };
}

export const personalityOptions = [
  'Warm',
  'Calm',
  'Funny',
  'Caring',
  'Direct',
  'Motivating',
];

export const communicationOptions = [
  'Natural',
  'Short',
  'Detailed',
  'Casual',
  'Professional',
];

export const relationshipOptions = [
  'Companion',
  'Friend',
  'Brother',
  'Sister',
  'Mentor',
  'Study Partner',
  'Career Coach',
  'Productivity Coach',
  'Creative Partner',
  'Emotional Companion',
];
