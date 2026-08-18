import { useState } from 'react';

const initialPrivacy = {
  personalization: true,
  memory: true,
  analytics: true,
  notifications: true,
  voiceData: false,
  aiImprovement: true,
};

export function usePrivacy() {
  const [privacy, setPrivacy] = useState(initialPrivacy);

  const togglePrivacy = (key) => {
    setPrivacy((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const enablePrivacy = () => {
    setPrivacy({
      personalization: true,
      memory: true,
      analytics: true,
      notifications: true,
      voiceData: false,
      aiImprovement: true,
    });
  };

  return {
    privacy,
    togglePrivacy,
    enablePrivacy,
  };
}
