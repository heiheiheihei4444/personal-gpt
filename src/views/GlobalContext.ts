import { createContext } from 'react';

export interface IConversation {
  id: string;
  temperature: number;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface IConfig {
  currentId: string;
  title?: string;
  model: string;
  apiKey?: string;
  temperature?: number;
}

export type IConversations = { [key: string]: IConversation };

export const GlobalContext = createContext<{
  config: IConfig;
  allConversations: IConversations;
  setCurrentConversation?: (conversation: IConversation) => IConversation;
  setAllConversations?: (conversations: IConversations) => IConversations;
  setConfig?: (config: IConfig) => IConfig;
}>({
  config: { title: '', model: '', apiKey: '', temperature: 0.7, currentId: '' },
  allConversations: [],
  currentConversation: {},
});
