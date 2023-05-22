import React, { useContext } from 'react';
import { Input } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteFilled } from '@ant-design/icons';
import { GlobalContext, IConversation } from '../GlobalContext';
import './index.less';

function Slider() {
  const { allConversations, currentConversation, setCurrentConversation } =
    useContext(GlobalContext);

  const onSelectConversations = (conversation: IConversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <div className="slider">
      <div className="slider-header">
        <Input placeholder="搜索" prefix={<SearchOutlined />} size="large" />
        <PlusOutlined className="slider-header-add" />
      </div>
      <div className="slider-content">
        {allConversations.map((conversation, index) => (
          <div
            key={index}
            className={`slider-content-item ${
              currentConversation.id === conversation.id && 'item-selected'
            }`}
            onClick={() => onSelectConversations(conversation)}
          >
            <div className="slider-content-item-header">
              {conversation.messages[0].content}
            </div>
            <div className="slider-content-item-content">
              {conversation.messages[1].content}
            </div>
            <DeleteFilled className="slider-content-item-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
