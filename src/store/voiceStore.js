import { useState } from 'react';

let voiceSettings = {
  enabled: true,
  selectedVoice: 'Reliora',
  speakingSpeed: 1,
  handsFree: false,
  autoListen: false,
  hapticFeedback: true,
};

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener(voiceSettings));
}

export function getVoiceSettings() {
  return { ...voiceSettings };
}

export function updateVoiceSettings(updates) {
  voiceSettings = {
    ...voiceSettings,
    ...updates,
  };

  notify();
  return { ...voiceSettings };
}

export function useVoiceStore() {
  const [settings, setSettings] = useState({ ...voiceSettings });

  const update = (updates) => {
    const result = updateVoiceSettings(updates);
    setSettings(result);
    return result;
  };

  return {
    settings,
    update,
  };
}

export const voiceOptions = [
  {
    id: 'Reliora',
    label: 'Reliora',
    description: 'Warm and balanced',
  },
  {
    id: 'Calm',
    label: 'Calm',
    description: 'Soft and relaxed',
  },
  {
    id: 'Bright',
    label: 'Bright',
    description: 'Energetic and friendly',
  },
];
