import { useState } from 'react';

const initialChats = [];

export function useChatHistory() {
  const [chats, setChats] = useState(initialChats);

  const createChat = (title = 'New Conversation') => {
    const chat = {
      id: Date.now().toString(),
      title,
      preview: '',
      messages: [],
      pinned: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChats((current) => [chat, ...current]);

    return chat;
  };

  const updateChat = (id, updates) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : chat
      )
    );
  };

  const deleteChat = (id) => {
    setChats((current) =>
      current.filter((chat) => chat.id !== id)
    );
  };

  const togglePin = (id) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === id
          ? { ...chat, pinned: !chat.pinned }
          : chat
      )
    );
  };

  const toggleArchive = (id) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === id
          ? { ...chat, archived: !chat.archived }
          : chat
      )
    );
  };

  const clearHistory = () => {
    setChats([]);
  };

  return {
    chats,
    createChat,
    updateChat,
    deleteChat,
    togglePin,
    toggleArchive,
    clearHistory,
  };
}
