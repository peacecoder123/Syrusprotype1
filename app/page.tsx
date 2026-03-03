'use client'

import { useState, useCallback } from 'react'
import { Menu } from 'lucide-react'
import LeftSidebar from '@/components/LeftSidebar'
import ChatPane from '@/components/ChatPane'
import RightSidebar from '@/components/RightSidebar'
import MobileDrawer from '@/components/MobileDrawer'
import type { Message, QuestItem, DocumentContext } from '@/types'

const INITIAL_QUESTS: QuestItem[] = [
  { id: '1', title: 'Access Company GitHub', status: 'completed' },
  { id: '2', title: 'Configure Local Environment', status: 'completed' },
  { id: '3', title: 'Review Backend Architecture', status: 'in-progress' },
  { id: '4', title: 'Complete Security Training', status: 'pending' },
  { id: '5', title: 'Submit First Pull Request', status: 'pending' },
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'agent',
    content: `# Welcome to DevGuide AI 🤖

I'm your **autonomous onboarding assistant**. Here's what I can do for you:

- 🗺️ **Guide you** through the entire onboarding process step-by-step
- 📚 **Retrieve documentation** and render it directly in this interface
- ⚙️ **Configure your environment** with verified setup scripts
- 🔐 **Handle HR & IT tasks** automatically in the background

Let's get you productive. What would you like to tackle first?`,
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'system',
    content: '✅ GitHub Access Verified',
    timestamp: new Date(),
  },
  {
    id: '3',
    role: 'agent',
    content: `Your local environment is ready to configure. Run this verified setup script:

\`\`\`bash
curl -sL devguide.local/verify | bash
\`\`\`

This will:
1. Clone the monorepo
2. Install all dependencies via \`pnpm install\`
3. Set up your \`.env.local\` with dev credentials
4. Start the local dev server on \`http://localhost:3000\``,
    timestamp: new Date(),
  },
  {
    id: '4',
    role: 'system',
    content: '🎉 Local Environment Configured Successfully',
    timestamp: new Date(),
  },
]

const AGENT_RESPONSES: Array<{ content: string; document?: DocumentContext }> = [
  {
    content: `## Backend Architecture Overview

Our backend is a **microservices architecture** deployed on AWS ECS. Here are the key services:

\`\`\`yaml
services:
  api-gateway:      # Kong on port 8000
  auth-service:     # Node.js + JWT, port 3001
  user-service:     # Node.js + PostgreSQL, port 3002
  notification-svc: # Node.js + Redis, port 3003
\`\`\`

Check the right panel for the full architecture document.`,
    document: {
      title: '📄 backend_architecture.pdf',
      content: `# Backend Architecture

## Overview
Our platform uses a microservices architecture deployed on AWS ECS Fargate.

## Services

### API Gateway (Kong)
- Port: 8000 (HTTP), 8443 (HTTPS)
- Handles rate limiting, auth, and routing
- Plugins: JWT, CORS, rate-limit

### Auth Service
- Technology: Node.js 20, Express, JWT
- Database: Redis (sessions)
- Endpoints: /auth/login, /auth/refresh, /auth/logout

### User Service
- Technology: Node.js 20, Fastify
- Database: PostgreSQL 15 with Prisma ORM
- Endpoints: /users/*, /profiles/*

### Notification Service
- Technology: Node.js 20
- Queue: Redis Streams
- Channels: Email (SendGrid), Slack, In-app

## Infrastructure
- Container orchestration: AWS ECS Fargate
- CI/CD: GitHub Actions → ECR → ECS rolling deploy
- Monitoring: Datadog APM + Logs
- Secrets: AWS Secrets Manager`,
    },
  },
  {
    content: `## Security Training Checklist

To complete your security training, review these policies:

- **SOC 2 Compliance**: All data handling must follow our \`SECURITY.md\`
- **Secret Management**: Never commit secrets — use \`doppler run\`
- **Code Review**: All PRs require 2 approvals + passing CI

\`\`\`bash
# Install Doppler CLI for secret management
brew install dopplerhq/cli/doppler
doppler login
doppler setup --project myapp --config dev
\`\`\``,
  },
  {
    content: `## Creating Your First Pull Request

Follow this workflow to submit your first PR:

\`\`\`bash
git checkout -b feat/my-first-feature
# ... make your changes ...
git add -A
git commit -m "feat: add my first feature"
git push origin feat/my-first-feature
\`\`\`

Then open a PR on GitHub and request review from **@team-lead**.

> 💡 Use **Conventional Commits** format for all commit messages.`,
  },
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [questItems, setQuestItems] = useState<QuestItem[]>(INITIAL_QUESTS)
  const [activeDocument, setActiveDocument] = useState<DocumentContext | null>(null)
  const [isAgentTyping, setIsAgentTyping] = useState(false)
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [responseIndex, setResponseIndex] = useState(0)

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isAgentTyping) return

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setIsAgentTyping(true)

      setTimeout(() => {
        const response = AGENT_RESPONSES[responseIndex % AGENT_RESPONSES.length]
        setResponseIndex((i) => i + 1)

        const agentMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: response.content,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, agentMsg])

        if (response.document) {
          setActiveDocument(response.document)
        }

        setQuestItems((prev) => {
          const inProgressIndex = prev.findIndex((q) => q.status === 'in-progress')
          if (inProgressIndex !== -1) {
            const updated = [...prev]
            updated[inProgressIndex] = { ...updated[inProgressIndex], status: 'completed' }
            const nextPendingIndex = updated.findIndex((q) => q.status === 'pending')
            if (nextPendingIndex !== -1) {
              updated[nextPendingIndex] = { ...updated[nextPendingIndex], status: 'in-progress' }
            }
            return updated
          }
          return prev
        })

        setIsAgentTyping(false)
      }, 2000)
    },
    [isAgentTyping, responseIndex]
  )

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile top nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-14 bg-slate-900 border-b border-slate-700">
        <button onClick={() => setLeftOpen(true)} className="text-slate-300 hover:text-white p-1">
          <Menu size={22} />
        </button>
        <span className="text-white font-semibold text-sm">DevGuide AI</span>
        <button onClick={() => setRightOpen(true)} className="text-slate-300 hover:text-white p-1">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawers */}
      <MobileDrawer isOpen={leftOpen} onClose={() => setLeftOpen(false)} side="left">
        <LeftSidebar questItems={questItems} />
      </MobileDrawer>
      <MobileDrawer isOpen={rightOpen} onClose={() => setRightOpen(false)} side="right">
        <RightSidebar activeDocument={activeDocument} />
      </MobileDrawer>

      {/* Desktop layout */}
      <div className="hidden lg:flex w-1/4 shrink-0">
        <LeftSidebar questItems={questItems} />
      </div>
      <div className="flex-1 flex flex-col pt-14 lg:pt-0">
        <ChatPane
          messages={messages}
          isAgentTyping={isAgentTyping}
          onSendMessage={handleSendMessage}
        />
      </div>
      <div className="hidden lg:flex w-1/4 shrink-0">
        <RightSidebar activeDocument={activeDocument} />
      </div>
    </div>
  )
}
