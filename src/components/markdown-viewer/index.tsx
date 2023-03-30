"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import  Image  from 'next/image';
import classnames from "classnames/bind";
import styles from "./markdown-viewer.module.scss";

const ss = classnames.bind(styles);

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className={ss('wrapper')}>
    <ReactMarkdown
      className="prose max-w-none"
      remarkPlugins={[remarkGfm]}
      components={{
        // code 하이라이팅
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              language={match[1]}
              PreTag='div'
              style={{...props.style, ...materialDark} as any}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      
        // img 변환
        img: (image) => (
          <Image
            src={image.src || ''}
            alt={image.alt || ''}
            width={600}
            height={350}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}

