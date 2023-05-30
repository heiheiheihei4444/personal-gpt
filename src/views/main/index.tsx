import React, { useContext, useEffect, useState } from 'react';
import { Input, message } from 'antd';
import { CopyFilled, BulbOutlined } from '@ant-design/icons';
import { GlobalContext } from '@views/GlobalContext';
import ReactMarkdown from 'react-markdown';
import RemarkMath from 'remark-math';
import RehypeKatex from 'rehype-katex';
import RemarkGfm from 'remark-gfm';
import RemarkBreaks from 'remark-breaks';
import RehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 代码高亮主题风格
import './index.less';

function Main() {
  const {
    config,
    currentConversation,
    setCurrentConversation,
    setAllConversations,
  } = useContext(GlobalContext);
  const { model, apiKey, temperature } = config || {};
  const [inputValue, setInputValue] = useState('');

  const getGptData = async (messages: { role: string; content: string }[]) => {
    const response = await fetch('/api/completions', {
      method: 'POST',
      body: JSON.stringify({
        model,
        apiKey,
        messages,
        temperature,
      }),
    });
    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let answer = '';
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      answer += chunkValue;
      if (messages[messages.length - 1].role !== 'assistant') {
        messages.push({ role: 'assistant', content: answer });
      } else {
        messages[messages.length - 1].content = answer;
      }
      setCurrentConversation((pre) => {
        return {
          ...pre,
          messages,
        };
      });
    }
    setTimeout(() => {
      setAllConversations((pre) => ({
        ...pre,
        [currentConversation.id]: { ...currentConversation, messages },
      }));
    }, 1000);
  };

  const onSend = () => {
    if (!inputValue) {
      return;
    }
    const messages = currentConversation.messages.concat([
      { role: 'user', content: inputValue },
    ]);
    getGptData(messages);
    const modifyConversation = {
      ...currentConversation,
      messages,
    };
    setCurrentConversation(modifyConversation);
    setAllConversations((pre) => {
      pre[currentConversation.id] = modifyConversation;
      return pre;
    });
    setInputValue('');
  };

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('复制成功!');
    });
  };

  useEffect(() => {
    var element = document.getElementById('main-conversation'); // 获取需要滚动的元素
    // 在内容变化时自动滚动到底部
    element.addEventListener('DOMSubtreeModified', function () {
      element.scrollTop = element.scrollHeight;
    });
  }, []);

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
      <div
        className="w-full flex items-start justify-start gap-5"
        key={index}
        style={{ fontFamily: '翩翩体-简' }}
      >
        <img src="/ai.svg" className="w-8 mt-3"></img>
        <div className="rounded-xl p-4 text-gray-600 bg-slate-100">
          <ReactMarkdown
            children={content}
            remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
            rehypePlugins={[RehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return (
                  <span className="code-block" style={{ position: 'relative' }}>
                    {!inline && match ? (
                      <>
                        <SyntaxHighlighter
                          showLineNumbers={true}
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                        <CopyFilled
                          className="code-copy-icon"
                          onClick={() => onCopy(children[0])}
                        />
                      </>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )}
                  </span>
                );
              },
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div id="main" className="relative" style={{ height: 'calc(100% - 60px)' }}>
      <div
        id="main-conversation"
        className="p-7 overflow-auto h-full"
        style={{ paddingBottom: 115 }}
      >
        {!currentConversation?.messages?.length && '请输入内容查找'}
        {currentConversation?.messages?.map((message, index) =>
          message.role === 'user'
            ? renderUserBubble(message.content, index)
            : renderAiBubble(message.content, index)
        )}
      </div>
      <div className=" absolute w-full bottom-0 left-0 min-h-fit bg-white flex items-center justify-center gap-7 rounded-2xl px-7 py-3">
        <BulbOutlined />
        <Input.TextArea
          allowClear
          autoSize={{ minRows: 1, maxRows: 3 }}
          value={inputValue}
          className="flex-1"
          size="large"
          placeholder="输入一条消息"
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={onSend}
        />
        <img
          src="/send.svg"
          className={`cursor-pointer ${!inputValue && 'cursor-not-allowed'}`}
          onClick={onSend}
        />
      </div>
    </div>
  );
}

export default Main;
