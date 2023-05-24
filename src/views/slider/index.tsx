import React, { useContext } from 'react';
import { Input } from '@douyinfe/semi-ui';
import { IconPlus, IconSearchStroked, IconDelete } from '@douyinfe/semi-icons';
import { GlobalContext, IConversation } from '../GlobalContext';
import { generateConverstationInit } from '@/contants';
import './index.less';

function Slider() {
  const {
    config,
    allConversations,
    currentConversation,
    setCurrentConversation,
    setAllConversations,
  } = useContext(GlobalContext);

  const onSelectConversations = (conversation: IConversation) => {
    setCurrentConversation(conversation);
  };

  const onAddConversation = () => {
    const initObj = generateConverstationInit('text');
    setCurrentConversation(initObj);
    setAllConversations((pre) => [initObj].concat(pre));
  };

  const onDeleteConversation = (e, id: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setAllConversations((pre) => {
      const data = pre.filter((item) => item.id !== id);

      if (currentConversation.id === id) {
        setCurrentConversation(data[0]);
      }
      return data;
    });
  };

  return (
    <div className="slider">
      <div className="slider-header">
        <Input placeholder="搜索" prefix={<IconSearchStroked />} size="large" />
        <IconPlus className="slider-header-add" onClick={onAddConversation} />
      </div>
      <div className="slider-content">
        {allConversations?.map((conversation, index) => (
          <div
            key={index}
            className={`slider-content-item ${
              currentConversation.id === conversation.id && 'item-selected'
            }`}
            onClick={() => onSelectConversations(conversation)}
          >
            <div className="slider-content-item-header">
              {conversation.messages[0]?.content || '新的对话'}
            </div>
            <div className="slider-content-item-content">
              {conversation.messages[1]?.content}
            </div>
            <IconDelete
              className="slider-content-item-icon"
              onClick={(e) => onDeleteConversation(e, conversation.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
