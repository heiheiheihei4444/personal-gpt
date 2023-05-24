import { createContext } from 'react';

export interface IConversation {
  id: string;
  temperature: number;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface IConfig {
  title?: string;
  model: string;
  apiKey?: string;
  temperature?: number;
}

export const GlobalContext = createContext<{
  config: IConfig;
  allConversations: IConversation[];
  currentConversation: IConversation;
  setCurrentConversation?: (conversation: IConversation) => IConversation;
  setConfig?: (config: IConfig) => IConfig;
}>({
  config: { title: '', model: '', apiKey: '', temperature: 0.7 },
  allConversations: [],
  currentConversation: {},
});
