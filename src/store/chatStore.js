import { useSyncExternalStore } from 'react';

const initialState = {
  currentChatId: 'default-chat',
  title: 'New Conversation',
  messages: [
    {
      id: 'welcome',
      type: 'ai',
      text: "Hey Harsh 👋 I'm Reliora. I'm here with you. What's on your mind?",
    },
  ],
  pinned: false,
  archived: false,
  updatedAt: new Date().toISOString(),
};

let state = initialState;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useChatStore() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );
}

export function addMessage(message) {
  state = {
    ...state,
    messages: [
      ...state.messages,
      {
        ...message,
        id: message.id || Date.now().toString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function renameCurrentChat(title) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return;

  state = {
    ...state,
    title: cleanTitle,
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function togglePinCurrentChat() {
  state = {
    ...state,
    pinned: !state.pinned,
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function toggleArchiveCurrentChat() {
  state = {
    ...state,
    archived: !state.archived,
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function deleteCurrentChat() {
  state = {
    ...initialState,
    currentChatId: Date.now().toString(),
    title: 'New Conversation',
    messages: [],
    pinned: false,
    archived: false,
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function startNewChat() {
  state = {
    ...initialState,
    currentChatId: Date.now().toString(),
    title: 'New Conversation',
    messages: [],
    pinned: false,
    archived: false,
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function clearChat() {
  state = {
    ...state,
    messages: [],
    updatedAt: new Date().toISOString(),
  };

  emit();
}

export function getCurrentChat() {
  return state;
}

export function getMessages() {
  return state.messages;
}
