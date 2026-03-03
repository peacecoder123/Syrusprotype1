'use client'

import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { Bot, User } from 'lucide-react'
import CodeBlock from './CodeBlock'
import type { Message } from '@/types'

interface ChatMessageProps {
  message: Message
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const isBlock = String(children).includes('\n') || !!match
    if (!isBlock) {
      return (
        <code
          className="px-1.5 py-0.5 bg-slate-100 text-indigo-600 rounded text-xs font-mono"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <CodeBlock language={match ? match[1] : undefined}>
        {String(children).replace(/\n$/, '')}
      </CodeBlock>
    )
  },
  pre({ children }) {
    return <>{children}</>
  },
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'system') {
    const isSuccess = message.content.startsWith('✅') || message.content.startsWith('🎉')
    return (
      <div className="flex justify-center my-2">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            isSuccess
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}
        >
          {message.content}
        </span>
      </div>
    )
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-indigo-500' : 'bg-slate-800'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-indigo-400" />
        )}
      </div>

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-indigo-500 text-white rounded-tr-sm'
            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-slate max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
