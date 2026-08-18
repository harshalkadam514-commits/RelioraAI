import { useState } from 'react';

const initialMemories = [
  {
    id: '1',
    type: 'personal',
    title: 'Name',
    content: 'Harsh',
    createdAt: 'Today',
    private: true,
  },
  {
    id: '2',
    type: 'preference',
    title: 'Communication',
    content: 'Prefers natural and direct conversations.',
    createdAt: 'Today',
    private: true,
  },
  {
    id: '3',
    type: 'goal',
    title: 'Long-term goal',
    content: 'Wants to build a successful career and meaningful projects.',
    createdAt: 'Today',
    private: true,
  },
];

let memoryData = [...initialMemories];

export function getMemories() {
  return [...memoryData];
}

export function addMemory(memory) {
  const newMemory = {
    id: Date.now().toString(),
    createdAt: new Date().toLocaleDateString(),
    private: true,
    ...memory,
  };

  memoryData = [newMemory, ...memoryData];
  return newMemory;
}

export function updateMemory(id, updates) {
  memoryData = memoryData.map((memory) =>
    memory.id === id
      ? { ...memory, ...updates }
      : memory
  );

  return memoryData.find((memory) => memory.id === id);
}

export function deleteMemory(id) {
  memoryData = memoryData.filter(
    (memory) => memory.id !== id
  );
}

export function forgetMemory(id) {
  deleteMemory(id);
}

export function clearAllMemories() {
  memoryData = [];
}

export function useMemoryStore() {
  const [memories, setMemories] = useState(memoryData);

  const refresh = () => {
    setMemories([...memoryData]);
  };

  return {
    memories,
    addMemory: (memory) => {
      const result = addMemory(memory);
      refresh();
      return result;
    },
    updateMemory: (id, updates) => {
      const result = updateMemory(id, updates);
      refresh();
      return result;
    },
    deleteMemory: (id) => {
      deleteMemory(id);
      refresh();
    },
    forgetMemory: (id) => {
      forgetMemory(id);
      refresh();
    },
    clearAllMemories: () => {
      clearAllMemories();
      refresh();
    },
  };
}
