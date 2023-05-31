import React from 'react';
import { Skeleton } from 'antd';
import ReactMarkdown from 'react-markdown';
import { CopyFilled } from '@ant-design/icons';
import RemarkMath from 'remark-math';
import RehypeKatex from 'rehype-katex';
import RemarkGfm from 'remark-gfm';
import RemarkBreaks from 'remark-breaks';
import RehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 代码高亮主题风格

interface IAiBubble {
  keyIndex: string;
  content: string;
  loading: boolean;
}

function AiBubble(props: IAiBubble) {
  const { keyIndex, content, loading } = props;
  console.log(444, loading && !content);

  return (
    <div
      className="flex items-start justify-start gap-5 my-3 relative"
      key={keyIndex}
      style={{ maxWidth: '90%' }}
    >
      <img src="/ai.svg" className="w-8 mt-2"></img>
      <Skeleton
        active
        loading={loading && !content}
        paragraph={{ rows: 1, width: 200 }}
        title={false}
      >
        <div className="rounded-xl p-4 text-gray-600 bg-slate-100">
          <ReactMarkdown
            children={content}
            remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
            rehypePlugins={[RehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return (
                  <span
                    className="code-block w-full overflow-auto"
                    style={{ position: 'relative' }}
                  >
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
                          className="code-copy-icon cursor-pointer absolute right-7 top-7 text-gray-300 hidden"
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
      </Skeleton>
    </div>
  );
}

export default AiBubble;
