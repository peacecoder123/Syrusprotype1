export type MessageRole = 'user' | 'agent' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type QuestStatus = 'pending' | 'in-progress' | 'completed';

export interface QuestItem {
  id: string;
  title: string;
  status: QuestStatus;
}

export interface DocumentContext {
  title: string;
  content: string;
}
