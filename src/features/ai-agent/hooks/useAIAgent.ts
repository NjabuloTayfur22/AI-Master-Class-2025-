import { useState } from 'react';
import { AIAgentService } from '../services/AIAgentService';
import { Message } from '../types';

export function useAIAgent(initialContext?: string) {
  const [agent] = useState(() => new AIAgentService(initialContext));
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = async (message: string) => {
    setIsProcessing(true);
    try {
      const response = await agent.processMessage(message);
      setMessages(agent.getMessageHistory());
      return response;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    sendMessage,
    isProcessing,
    clearHistory: () => {
      agent.clearHistory();
      setMessages([]);
    }
  };
}