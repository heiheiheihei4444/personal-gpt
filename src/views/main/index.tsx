import React, { useContext } from 'react';
import { Avatar, Input } from 'antd';
import { GlobalContext } from '@views/GlobalContext';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import './index.css';

function Main() {
  const { currentConversation } = useContext(GlobalContext);

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
    <div className="main">
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
          className="main-send-input"
          size="large"
          placeholder="输入一条消息"
        />
        <img src="/send.svg" className="main-send-icon" />
      </div>
    </div>
  );
}

export default Main;
