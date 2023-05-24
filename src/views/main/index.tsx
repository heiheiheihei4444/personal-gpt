import React, { useContext, useState } from 'react';
import { Input } from '@douyinfe/semi-ui';
import { GlobalContext } from '@views/GlobalContext';
import './index.css';

function Main() {
  const { config, currentConversation, setCurrentConversation } =
    useContext(GlobalContext);
  const { model, apiKey, temperature } = config || {};

  const [inputValue, setInputValue] = useState('');

  const getGptData = async (messages: { role: string; content: string }[]) => {
    const data = await fetch('/api/completions', {
      method: 'POST',
      body: JSON.stringify({
        model,
        apiKey,
        messages,
        temperature,
      }),
    });
    console.log(data);
  };

  const onSend = () => {
    if (!inputValue) {
      return;
    }
    const messages = currentConversation.messages.concat([
      { role: 'user', content: inputValue },
    ]);
    getGptData(messages);
    setCurrentConversation((pre) => ({
      ...pre,
      messages,
    }));
    setInputValue('');
  };

  const renderUserBubble = (content: string, index: number) => {
    return (
      <div className="user-bubble" key={index}>
        <div className="user-bubble-content">{content}</div>
        <img src="/user.svg" className="user-bubble-avatar"></img>
      </div>
    );
  };

  const renderAiBubble = (content: string, index: number) => {
    return (
      <div className="ai-bubble" key={index}>
        <img src="/ai.svg" className="ai-bubble-avatar"></img>
        <div className="ai-bubble-content">{content}</div>
      </div>
    );
  };

  return (
    <div id="main" className="main">
      <div className="main-conversation">
        {!currentConversation?.messages?.length && '请输入内容查找'}
        {currentConversation?.messages?.map((message, index) =>
          message.role === 'user'
            ? renderUserBubble(message.content, index)
            : renderAiBubble(message.content, index)
        )}
      </div>
      <div className="main-send">
        <Input
          value={inputValue}
          className="main-send-input"
          size="large"
          placeholder="输入一条消息"
          onChange={(value) => setInputValue(value)}
          onEnterPress={onSend}
        />
        <img
          src="/send.svg"
          className={`main-send-icon ${!inputValue && 'not-send'}`}
          onClick={onSend}
        />
      </div>
    </div>
  );
}

export default Main;
