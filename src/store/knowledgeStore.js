import { useState } from 'react';

let knowledgeState = {
  recentSearches: [],
  documents: [],
  translations: [],
  savedIdeas: [],
};

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener(getKnowledge()));
}

export function getKnowledge() {
  return {
    recentSearches: [...knowledgeState.recentSearches],
    documents: [...knowledgeState.documents],
    translations: [...knowledgeState.translations],
    savedIdeas: [...knowledgeState.savedIdeas],
  };
}

export function addSearch(query) {
  if (!query?.trim()) return;

  knowledgeState.recentSearches = [
    {
      id: Date.now().toString(),
      query: query.trim(),
      createdAt: new Date().toISOString(),
    },
    ...knowledgeState.recentSearches,
  ].slice(0, 20);

  notify();
}

export function addDocument(name) {
  if (!name?.trim()) return;

  knowledgeState.documents = [
    {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    },
    ...knowledgeState.documents,
  ];

  notify();
}

export function addTranslation(source, target, result) {
  knowledgeState.translations = [
    {
      id: Date.now().toString(),
      source,
      target,
      result,
      createdAt: new Date().toISOString(),
    },
    ...knowledgeState.translations,
  ].slice(0, 20);

  notify();
}

export function saveIdea(title, content) {
  if (!title?.trim() && !content?.trim()) return;

  knowledgeState.savedIdeas = [
    {
      id: Date.now().toString(),
      title: title?.trim() || 'Untitled idea',
      content: content?.trim() || '',
      createdAt: new Date().toISOString(),
    },
    ...knowledgeState.savedIdeas,
  ];

  notify();
}

export function useKnowledgeStore() {
  const [data, setData] = useState(getKnowledge());

  const refresh = () => {
    setData(getKnowledge());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    knowledge: data,
    addSearch,
    addDocument,
    addTranslation,
    saveIdea,
    refresh,
    subscribe,
  };
}
