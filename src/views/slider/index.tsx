import React, { useContext } from 'react';
import { Input } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteFilled } from '@ant-design/icons';
import { GlobalContext, IConversation } from '../GlobalContext';
import { generateConverstationInit } from '@/contants';
import './index.less';

function Slider() {
  const {
    config,
    allConversations,
    currentConversation,
    setConfig,
    setCurrentConversation,
    setAllConversations,
  } = useContext(GlobalContext);

  const onSelectConversations = (conversation: IConversation) => {
    setCurrentConversation(conversation);
    setConfig((pre) => ({ ...pre, currentId: conversation.id }));
  };

  const onAddConversation = () => {
    const initObj = generateConverstationInit('text');
    setCurrentConversation(initObj);
    setAllConversations((pre) => ({ ...pre, [initObj.id]: initObj }));
  };

  const onDeleteConversation = (e, id: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setAllConversations((pre) => {
      delete pre[id];
      return pre;
    });
  };

  return (
    <div className="slider w-1/4 overflow-auto border-r-gray-100">
      <div className="slider-header">
        <Input placeholder="搜索" prefix={<SearchOutlined />} size="large" />
        <PlusOutlined
          className="slider-header-add"
          onClick={onAddConversation}
        />
      </div>
      <div className="slider-content">
        {Object.entries(allConversations).map(([key, conversation]) => {
          return (
            <div
              key={key}
              className={`slider-content-item ${
                currentConversation?.id === conversation?.id && 'item-selected'
              }`}
              onClick={() => onSelectConversations(conversation)}
            >
              <div className="slider-content-item-header">
                {conversation.messages[0]?.content || '新的对话'}
              </div>
              <div className="slider-content-item-content">
                {conversation.messages[1]?.content}
              </div>
              <DeleteFilled
                className="slider-content-item-icon"
                onClick={(e) => onDeleteConversation(e, conversation.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
