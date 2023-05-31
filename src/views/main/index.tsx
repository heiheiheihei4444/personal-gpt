import React, { useContext, useEffect, useState } from 'react';
import { Input, message, Tooltip, Button } from 'antd';
import { CopyFilled, BulbOutlined, HistoryOutlined } from '@ant-design/icons';
import { GlobalContext } from '@views/GlobalContext';
import ReactMarkdown from 'react-markdown';
import RemarkMath from 'remark-math';
import RehypeKatex from 'rehype-katex';
import RemarkGfm from 'remark-gfm';
import RemarkBreaks from 'remark-breaks';
import RehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 代码高亮主题风格
import InputBox from './input-box';
import AiBubble from './ai-bubble';
import UserBubble from './user-bubble';

function Main() {
  const {
    config,
    setConfig,
    currentConversation,
    setCurrentConversation,
    setAllConversations,
  } = useContext(GlobalContext);
  const { model, apiKey, n, size, temperature, isContinuous } = config || {};
  const [loading, setLoading] = useState(false);
  const [curMessage, setCurMessage] = useState([]);
  const [controller, setController] = useState<AbortController>(null);

  const updateStorage = (params: { type: 'all' | 'cur'; messages: any }) => {
    const id = currentConversation.id;
    const { type, messages } = params;
    if (type === 'all') {
      setAllConversations((pre) => ({
        ...pre,
        [id]: {
          ...pre[id],
          messages,
        },
      }));
    } else {
      setCurrentConversation((pre) => {
        return {
          ...pre,
          messages,
        };
      });
    }
  };

  const getGptData = async (messages: { role: string; content: string }[]) => {
    setLoading(true);
    const abortController = new AbortController();
    setController(abortController);
    let done = false;
    let answer = '';
    const modifyMessages = [...currentConversation.messages, ...messages];
    modifyMessages.push({ role: 'assistant', content: answer });
    updateStorage({ type: 'cur', messages: modifyMessages });

    const response = await fetch('/api/completions', {
      method: 'POST',
      body: JSON.stringify({
        model,
        apiKey,
        messages,
        temperature,
      }),
      signal: abortController.signal,
    });
    const data = response.body;
    console.log(response);
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      answer += chunkValue;
      if (response.status === 400) {
        answer =
          '当前连续对话已达极限，如需继续使用请新建对话或关闭连续对话功能！';
        done = true;
      }
      modifyMessages[modifyMessages.length - 1].content = answer;
      setCurMessage(modifyMessages);
      updateStorage({ type: 'cur', messages: modifyMessages });
    }
    setTimeout(() => {
      updateStorage({
        type: 'all',
        id: currentConversation.id,
        messages: modifyMessages,
      });
      setCurMessage([]);
      setLoading(false);
    }, 1000);
  };

  const getImageData = async (prompt: string) => {
    setLoading(true);
    const messages = currentConversation.messages.concat([
      { role: 'user', content: prompt },
      { role: 'assistant', content: '' },
    ]);
    updateStorage({ type: 'cur', messages });
    updateStorage({ type: 'all', messages });
    const res = await fetch('/api/images', {
      method: 'POST',
      body: JSON.stringify({
        n,
        size,
        apiKey,
        prompt,
      }),
    });

    const { data = [], msg } = await res.json();
    messages[messages.length - 1].content = data.reduce((pre, cur) => {
      pre += `![](${cur}) \n`;
      return pre;
    }, '');
    updateStorage({ type: 'cur', messages });
    updateStorage({ type: 'all', messages });
    setLoading(false);
  };

  const onSend = async (value: string) => {
    if (!value) {
      return;
    }

    if (currentConversation.type === 'image') {
      await getImageData(value);
    } else {
      const newMessages = [{ role: 'user', content: value }];
      const messages = currentConversation.messages.concat(newMessages);
      await getGptData(isContinuous ? messages : newMessages);
    }
  };

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('复制成功!');
    });
  };

  const onChangeContinuous = () => {
    setConfig((pre) => ({ ...pre, isContinuous: !config.isContinuous }));
  };

  const onStop = () => {
    controller?.abort?.();
    updateStorage({
      type: 'all',
      messages: curMessage,
    });
    setLoading(false);
    setCurMessage([]);
  };

  useEffect(() => {
    var element = document.getElementById('main-conversation'); // 获取需要滚动的元素
    // 在内容变化时自动滚动到底部
    element.addEventListener('DOMSubtreeModified', function () {
      element.scrollTop = element.scrollHeight;
    });
  }, []);

  return (
    <div
      id="main"
      className="w-full relative"
      style={{ height: 'calc(100% - 60px)' }}
    >
      <div
        id="main-conversation"
        className=" w-full p-7 overflow-auto h-full"
        style={{ paddingBottom: 115 }}
      >
        {!currentConversation?.messages?.length && '请输入内容查找'}
        {currentConversation?.messages?.map((message, index) =>
          message.role === 'user' ? (
            <UserBubble
              keyIndex={message.content.slice(0, 10) + index}
              content={message.content}
            />
          ) : (
            <AiBubble
              keyIndex={message.content.slice(0, 10) + index}
              content={message.content}
              loading={loading}
            />
          )
        )}
        {loading && (
          <div className=" w-full h-5 flex text-center justify-center">
            <Button type="dashed" onClick={onStop}>
              停止回答
            </Button>
          </div>
        )}
      </div>
      <InputBox loading={loading} onSend={onSend} />
    </div>
  );
}

export default Main;
