import React from 'react'
import { AIChat } from './features/ai-agent'

const App: React.FC = () => {
  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Nomvete Archives</h1>
      <p className="text-lg text-center mb-8">This is a custom-built AI assistant made with React and Tailwind.</p>
      
      <div className="max-w-4xl mx-auto">
        <AIChat />
      </div>
    </main>
  )
}

export default App