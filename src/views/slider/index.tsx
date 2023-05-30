import React, { useContext } from 'react';
import { Dropdown, Input } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteFilled } from '@ant-design/icons';
import { GlobalContext, IConversation } from '../GlobalContext';
import { generateConverstationInit } from '@/contants';
import './index.css';

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

  const onAddConversation = (type: 'text' | 'image') => {
    const initObj = generateConverstationInit(type);
    setCurrentConversation(initObj);
    setAllConversations((pre) => ({ [initObj.id]: initObj, ...pre }));
    setConfig((pre) => ({
      ...pre,
      currentId: initObj.id,
    }));
  };

  const onDeleteConversation = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    const allData = { ...allConversations };
    delete allData[id];
    const remainCons = Object.keys(allData);
    if (id === currentConversation.id) {
      if (remainCons.length) {
        setCurrentConversation(allData[remainCons[0]]);
        setConfig((pre) => ({
          ...pre,
          currentId: remainCons[0],
        }));
      } else {
        const data = generateConverstationInit('text');
        setCurrentConversation(data);
        setAllConversations({ [data.id]: data });
        setConfig((pre) => ({ ...pre, currentId: data.id }));
        return;
      }
    }
    setAllConversations(allData);
  };

  return (
    <div className="w-1/4 overflow-auto border-r p-4">
      <div className="flex items-center justify-between gap-4">
        <Input placeholder="搜索" prefix={<SearchOutlined />} size="large" />
        <Dropdown
          menu={{
            items: [
              {
                key: 'text',
                label: '新建文本对话',
                icon: <img src="/text.svg" className="w-4 h-3" />,
                onClick: () => onAddConversation('text'),
              },
              {
                key: 'image',
                label: '新建图像对话',
                icon: <img src="/image.svg" className="w-4 h-3" />,
                onClick: () => onAddConversation('image'),
              },
            ],
          }}
          on
        >
          <img src="/add.svg" className=" w-5 h-4 text-2xl cursor-pointer" />
        </Dropdown>
      </div>
      <div
        className="overflow-y-auto w-full overflow-x-hidden"
        style={{ height: 'calc( 100% - 40px)' }}
      >
        {Object.entries(allConversations).map(([key, conversation]) => {
          return (
            <div
              key={key}
              className={`flex justify-start items-center gap-2  con-item relative mt-3 cursor-pointer w-auto h-16 rounded-xl py-2 px-3 hover:bg-slate-200 ${
                currentConversation?.id === conversation?.id && 'item-selected'
              }`}
              onClick={() => onSelectConversations(conversation)}
            >
              <img
                className="w-6 h-5"
                src={conversation.type === 'text' ? '/text.svg' : '/image.svg'}
              />
              <div className=" w-5/6">
                <div className="items-center justify-between gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
                  {conversation.messages[0]?.content || '新的对话'}
                </div>
                <div className="slect-item font-normal text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-gray-400">
                  {conversation.messages[1]?.content}
                </div>
              </div>
              <DeleteFilled
                className="delete-icon"
                onClick={(event) =>
                  onDeleteConversation(event, conversation.id)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
