'use client'

import { FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { DocumentContext } from '@/types'

interface RightSidebarProps {
  activeDocument: DocumentContext | null
}

export default function RightSidebar({ activeDocument }: RightSidebarProps) {
  return (
    <aside className="w-full h-full bg-slate-50 border-l border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        {activeDocument ? (
          <span className="text-sm font-medium text-slate-700 truncate">{activeDocument.title}</span>
        ) : (
          <span className="text-sm font-semibold text-slate-600">Document Viewer</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeDocument ? (
          <article className="prose prose-sm prose-slate max-w-none">
            <ReactMarkdown>{activeDocument.content}</ReactMarkdown>
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
            <FileText size={40} className="text-slate-300" />
            <p className="text-sm text-center">Waiting for document context...</p>
            <p className="text-xs text-center text-slate-300">
              Documents referenced in the chat will appear here.
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
