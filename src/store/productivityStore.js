import { useState } from 'react';

export const defaultTasks = [
  {
    id: '1',
    title: 'Complete today priorities',
    completed: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Study for 45 minutes',
    completed: false,
    priority: 'medium',
  },
];

export const defaultHabits = [
  {
    id: '1',
    title: 'Study',
    streak: 0,
    completedToday: false,
  },
  {
    id: '2',
    title: 'Exercise',
    streak: 0,
    completedToday: false,
  },
  {
    id: '3',
    title: 'Journal',
    streak: 0,
    completedToday: false,
  },
];

export function useProductivity() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [habits, setHabits] = useState(defaultHabits);

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const addTask = (title, priority = 'medium') => {
    if (!title?.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
        priority,
      },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  };

  const toggleHabit = (id) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streak: habit.completedToday
                ? Math.max(0, habit.streak - 1)
                : habit.streak + 1,
            }
          : habit
      )
    );
  };

  const addHabit = (title) => {
    if (!title?.trim()) return;

    setHabits((current) => [
      ...current,
      {
        id: Date.now().toString(),
        title: title.trim(),
        streak: 0,
        completedToday: false,
      },
    ]);
  };

  return {
    tasks,
    habits,
    toggleTask,
    addTask,
    deleteTask,
    toggleHabit,
    addHabit,
  };
}
