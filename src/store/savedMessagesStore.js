import { useSyncExternalStore } from 'react';

let state = {
  savedMessages: [],
};

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

export function useSavedMessages() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );
}

export function saveMessage({
  chatId = 'default-chat',
  text,
  role = 'assistant',
}) {
  const clean = text?.trim();

  if (!clean) return null;

  const alreadySaved = state.savedMessages.some(
    (message) =>
      message.chatId === chatId &&
      message.text === clean
  );

  if (alreadySaved) return null;

  const message = {
    id: Date.now().toString(),
    chatId,
    text: clean,
    role,
    savedAt: new Date().toISOString(),
  };

  state = {
    ...state,
    savedMessages: [
      message,
      ...state.savedMessages,
    ],
  };

  emit();

  return message;
}

export function removeSavedMessage(id) {
  state = {
    ...state,
    savedMessages: state.savedMessages.filter(
      (message) => message.id !== id
    ),
  };

  emit();
}

export function isMessageSaved(text) {
  return state.savedMessages.some(
    (message) => message.text === text
  );
}

export function clearSavedMessages() {
  state = {
    ...state,
    savedMessages: [],
  };

  emit();
}

export function getSavedMessages() {
  return state.savedMessages;
}
