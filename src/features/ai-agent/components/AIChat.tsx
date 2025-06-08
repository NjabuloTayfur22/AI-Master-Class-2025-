import React, { useState } from 'react';
import { useAIAgent } from '../hooks/useAIAgent';

const AIChat: React.FC = () => {
  const { messages, sendMessage, isProcessing, clearHistory } = useAIAgent();
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const userMessage = inputText;
    setInputText('');
    await sendMessage(userMessage);
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto border rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="p-4 bg-blue-600 text-white font-bold">
        AI Assistant
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Send a message to start the conversation
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user' 
                  ? 'ml-auto bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          disabled={isProcessing || !inputText.trim()}
        >
          {isProcessing ? 'Sending...' : 'Send'}
        </button>
      </form>
      
      <div className="p-2 border-t text-center">
        <button
          onClick={clearHistory}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear conversation
        </button>
      </div>
    </div>
  );
};

export default AIChat;