import { useState } from 'react';

const initialAIBehavior = {
  empathy: 'High',
  proactivity: 'Balanced',
  responseLength: 'Balanced',
  adviceMode: 'Ask First',
  contextAwareness: true,
  followUps: true,
  emotionalSupport: true,
};

export function useAIBehavior() {
  const [settings, setSettings] = useState(
    initialAIBehavior
  );

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleSetting = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const resetAIBehavior = () => {
    setSettings(initialAIBehavior);
  };

  return {
    settings,
    updateSetting,
    toggleSetting,
    resetAIBehavior,
  };
}
