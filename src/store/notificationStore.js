import { useState } from 'react';

const initialNotifications = {
  dailyCheckIn: true,
  journalReminder: true,
  goalReminder: true,
  moodReminder: true,
  weeklyInsights: true,
  productUpdates: false,
};

export function useNotifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const enableAll = () => {
    setNotifications({
      dailyCheckIn: true,
      journalReminder: true,
      goalReminder: true,
      moodReminder: true,
      weeklyInsights: true,
      productUpdates: true,
    });
  };

  const disableAll = () => {
    setNotifications({
      dailyCheckIn: false,
      journalReminder: false,
      goalReminder: false,
      moodReminder: false,
      weeklyInsights: false,
      productUpdates: false,
    });
  };

  return {
    notifications,
    toggleNotification,
    enableAll,
    disableAll,
  };
}
