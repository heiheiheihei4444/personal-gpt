import { createContext } from 'react';

export interface IConversation {
  id: string;
  model: string;
  temperature: number;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export const GlobalContext = createContext<{
  title?: string;
  model: string;
  apiKey: string;
  temperature: number;
  allConversations: IConversation[];
  currentConversation: IConversation;
  setCurrentConversation?: () => void;
}>({
  title: '',
  model: '',
  apiKey: '',
  temperature: 0.7,
  allConversations: [],
  currentConversation: {},
});
