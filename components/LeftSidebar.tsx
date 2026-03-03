'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import QuestItemComponent from './QuestItem'
import type { QuestItem } from '@/types'

interface LeftSidebarProps {
  questItems: QuestItem[]
}

export default function LeftSidebar({ questItems }: LeftSidebarProps) {
  const completedCount = questItems.filter((q) => q.status === 'completed').length
  const total = questItems.length
  const percentage = Math.round((completedCount / total) * 100)

  return (
    <aside className="w-full h-full bg-slate-900 border-r border-slate-700 flex flex-col overflow-y-auto">
      {/* Profile Card */}
      <div className="p-5 border-b border-slate-700">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-500/50 shrink-0">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=DevUser"
                alt="Alex Chen"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Alex Chen</p>
              <p className="text-slate-400 text-xs">Senior Frontend Engineer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quest Log */}
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
            Quest Log
          </h2>
          <span className="text-indigo-400 font-bold text-sm">{percentage}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-700 rounded-full mb-5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Quest items */}
        <div className="space-y-2">
          {questItems.map((item) => (
            <QuestItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </aside>
  )
}
