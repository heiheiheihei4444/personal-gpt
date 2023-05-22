import { createContext } from 'react';

export const GlobalContext = createContext({
  allConversations: [],
  currentConversation: [],
  apiKey: '',
});
