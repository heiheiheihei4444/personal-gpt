import React, { useState } from 'react';
import Slider from './slider';
import Header from './header';
import Main from './main';
import { ConfigProvider } from 'antd';
import { GlobalContext, type IConversation } from './GlobalContext';

import './index.css';

function Views() {
  const [allConversations, setAllConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState<IConversation>(
    {}
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ABE38A',
          borderRadius: 2,
        },
      }}
    >
      <GlobalContext.Provider
        value={{
          title: 'PERSONAL GPT',
          allConversations: [
            {
              id: '555',
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'user',
                  content: 'GitHub地址ggasdgagggsdgsadgddsgdsagsdgasg',
                },
                {
                  role: 'assistant',
                  content:
                    '我的GitHub地址是 https://github.com/OpenAI-yuxuan/ 。',
                },
                {
                  role: 'user',
                  content: '上一个问题是什么？',
                },
                {
                  role: 'assistant',
                  content: '您上一个问题是关于我的GitHub地址的。',
                },
                {
                  role: 'user',
                  content: '你是谁',
                },
                {
                  role: 'assistant',
                  content: '我是一个AI语言模型，可以回答您的问题并提供帮助。',
                },
                {
                  role: 'user',
                  content: 'gitlab是什么',
                },
                {
                  role: 'assistant',
                  content:
                    'GitLab是一个基于Web的Git仓库管理工具，类似于GitHub。它提供了Git仓库管理、代码审查、问题跟踪、持续集成和部署等功能，可以帮助开发团队更高效地协作开发。GitLab也可以安装在本地服务器上，成为私有的Git仓库管理工具，提供更高的安全性和控制。',
                },
                {
                  role: 'user',
                  content: '第一个问题是什么',
                },
              ],
              temperature: 0.7,
            },
            {
              model: 'gpt-3.5-turbo',
              id: '444',
              messages: [
                {
                  role: 'user',
                  content: 'GitHub地址ggasdgagggsdgsadgddsgdsagsdgasg',
                },
                {
                  role: 'assistant',
                  content:
                    '我的GitHub地址是 https://github.com/OpenAI-yuxuan/ 。',
                },
                {
                  role: 'user',
                  content: '上一个问题是什么？',
                },
                {
                  role: 'assistant',
                  content: '您上一个问题是关于我的GitHub地址的。',
                },
                {
                  role: 'user',
                  content: '你是谁',
                },
                {
                  role: 'assistant',
                  content: '我是一个AI语言模型，可以回答您的问题并提供帮助。',
                },
                {
                  role: 'user',
                  content: 'gitlab是什么',
                },
                {
                  role: 'assistant',
                  content:
                    'GitLab是一个基于Web的Git仓库管理工具，类似于GitHub。它提供了Git仓库管理、代码审查、问题跟踪、持续集成和部署等功能，可以帮助开发团队更高效地协作开发。GitLab也可以安装在本地服务器上，成为私有的Git仓库管理工具，提供更高的安全性和控制。',
                },
                {
                  role: 'user',
                  content: '第一个问题是什么',
                },
              ],
              temperature: 0.7,
            },
          ],
          apiKey: '',
          currentConversation,
          setCurrentConversation,
        }}
      >
        <div className="views">
          <Slider />
          <div className="views-right">
            <Header />
            <Main />
          </div>
        </div>
      </GlobalContext.Provider>
    </ConfigProvider>
  );
}

export default Views;
