/** 模型列表 */
export const MODEL_OPTIONS = [
  { label: 'gpt-4-32k', value: 'gpt-4-32k' },
  { label: 'gpt-4', value: 'gpt-4' },
  { label: 'gpt-3.5-turbo-0301', value: 'gpt-3.5-turbo-0301' },
  { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
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
