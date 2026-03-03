'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import type { QuestItem } from '@/types'

interface QuestItemProps {
  item: QuestItem
}

export default function QuestItemComponent({ item }: QuestItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        item.status === 'in-progress'
          ? 'bg-indigo-500/10 border border-indigo-500/20'
          : 'border border-transparent'
      }`}
    >
      {item.status === 'completed' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
        </motion.div>
      )}
      {item.status === 'in-progress' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={16} className="text-indigo-400 shrink-0" />
        </motion.div>
      )}
      {item.status === 'pending' && (
        <Circle size={16} className="text-slate-500 shrink-0" />
      )}
      <span
        className={`text-xs font-medium leading-tight ${
          item.status === 'completed'
            ? 'text-slate-400 line-through'
            : item.status === 'in-progress'
            ? 'text-indigo-300'
            : 'text-slate-500'
        }`}
      >
        {item.title}
      </span>
    </motion.div>
  )
}
