'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  children: string
  language?: string
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-3 rounded-lg overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        {language && (
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-slate-900 p-4 overflow-x-auto">
        <code className="text-slate-300 font-mono text-xs">{children}</code>
      </pre>
    </div>
  )
}
