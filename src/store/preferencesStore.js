import { useState } from 'react';

const initialPreferences = {
  theme: 'Dark',
  language: 'English',
  haptics: true,
  animations: true,
  compactMode: false,
  sounds: true,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState(
    initialPreferences
  );

  const updatePreference = (key, value) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const resetPreferences = () => {
    setPreferences(initialPreferences);
  };

  return {
    preferences,
    updatePreference,
    togglePreference,
    resetPreferences,
  };
}
