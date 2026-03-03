'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  side: 'left' | 'right'
  children: ReactNode
}

export default function MobileDrawer({ isOpen, onClose, side, children }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} z-50 w-80 h-full shadow-2xl`}
            initial={{ x: side === 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'left' ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
