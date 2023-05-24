import { generateUniqueString } from '@utils/common';
import type { IConfig, IConversation } from '@views/GlobalContext';

/** 模型列表 */
export const MODEL_OPTIONS = [
  { label: 'gpt-4-32k', value: 'gpt-4-32k' },
  { label: 'gpt-4', value: 'gpt-4' },
  { label: 'gpt-3.5-turbo-0301', value: 'gpt-3.5-turbo-0301' },
  { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
  { label: 'gpt-3.5', value: 'gpt-3.5' },
];

/** 全部对话 */
export const ALL_CONVERSTATIONS = 'ALL_CONVERSTATIONS';
/** 当前对话 */
export const CURRENT_CONVERSATION = 'CURRENT_CONVERSATION';
/** 全局配置 */
export const GLOBAL_CONFIG = 'GLOBAL_CONFIG';

/** 设置缓存 */
export const setLocalStorage = (key: string, data: any) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

/** 获取缓存 */
export const getLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

/**
 * 生成初始对话对象
 * @param type
 * @param config
 * @returns
 */
export const generateConverstationInit = (
  type: 'text' | 'image'
): IConversation => {
  if (type === 'text') {
    return {
      id: generateUniqueString(8),
      messages: [],
    };
  } else {
    return {};
  }
};

export const generateConfigInit = () => ({
  title: 'PERSONAL GPT',
  model: 'gpt-3.5-turbo',
  apiKey: '',
  temperature: 0.7,
});
