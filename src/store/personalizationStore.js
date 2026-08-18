import { useState } from 'react';

const initialPersonalization = {
  companionName: 'Reliora',
  relationship: 'Best Friend',
  responseStyle: 'Balanced',
  humor: 'Moderate',
  emotionalDepth: 'High',
  language: 'English',
};

export function usePersonalization() {
  const [settings, setSettings] = useState(
    initialPersonalization
  );

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetPersonalization = () => {
    setSettings(initialPersonalization);
  };

  return {
    settings,
    updateSetting,
    resetPersonalization,
  };
}
