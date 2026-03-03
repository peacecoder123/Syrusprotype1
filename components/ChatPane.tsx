'use client'

import { useRef, useEffect, useState } from 'react'
import { Send, Square, Bot } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import type { Message } from '@/types'

interface ChatPaneProps {
  messages: Message[]
  isAgentTyping: boolean
  onSendMessage: (text: string) => void
}

export default function ChatPane({ messages, isAgentTyping, onSendMessage }: ChatPaneProps) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isAgentTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
          <Bot size={16} className="text-indigo-400" />
        </div>
        <div>
          <h1 className="font-semibold text-slate-800 text-sm leading-tight">DevGuide AI</h1>
          <p className="text-xs text-slate-400">Autonomous Onboarding Assistant</p>
        </div>
        {isAgentTyping && (
          <span className="ml-auto text-xs text-indigo-500 animate-pulse">Thinking...</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChatMessage message={msg} />
          </motion.div>
        ))}
        <AnimatePresence>
          {isAgentTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 px-6 py-4 border-t border-slate-200 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask DevGuide AI anything..."
            disabled={isAgentTyping}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 transition disabled:opacity-50"
          />
          {isAgentTyping ? (
            <button
              type="button"
              className="w-11 h-11 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition shrink-0"
            >
              <Square size={16} className="text-white" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 flex items-center justify-center transition shrink-0"
            >
              <Send size={16} className="text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
