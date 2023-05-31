import React, { useContext, useState } from 'react';
import { Input, Tooltip } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { GlobalContext } from '@views/GlobalContext';

interface IInputBox {
  loading: boolean;
  onSend: (value?: string) => void;
}

function InputBox(props: IInputBox) {
  const { loading, onSend } = props;
  const [inputValue, setInputValue] = useState('');

  const { config, setConfig } = useContext(GlobalContext);

  const onChangeContinuous = () => {
    setConfig((pre) => ({ ...pre, isContinuous: !config.isContinuous }));
  };

  const onSendData = () => {
    setInputValue('');
    onSend(inputValue);
  };

  return (
    <div className=" absolute w-full bottom-0 left-0 min-h-fit bg-white flex items-center justify-center gap-7 rounded-2xl px-7 py-3">
      <Tooltip title={`${config.isContinuous ? '关闭' : '开启'}连续对话`}>
        <HistoryOutlined
          className={`cursor-pointer ${
            config.isContinuous ? ' text-orange-500' : 'text-gray-300'
          }`}
          onClick={onChangeContinuous}
        />
      </Tooltip>
      <Input.TextArea
        allowClear
        value={inputValue}
        autoSize={{ minRows: 1, maxRows: 3 }}
        className="flex-1"
        size="large"
        placeholder="输入一条消息"
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey && !loading) {
            e.preventDefault();
            onSendData();
          }
        }}
      />
      <img
        src="/send.svg"
        className={` ${
          !inputValue || loading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={onSendData}
      />
    </div>
  );
}

export default InputBox;
