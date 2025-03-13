import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // 1. Fetch chatbot response from API Gateway
  const getChatbotResponse = async (userText) => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Our Lambda expects { "query": "user question" } in the body
        body: JSON.stringify({ query: userText }),
      });

      const data = await response.json();
      // data.answer should be the chatbot's reply (assuming Lambda returns { "answer": "...response..." })
      return data.answer || 'No answer field in response.';
    } catch (error) {
      console.error('Error calling API:', error);
      return 'Oops! Something went wrong.';
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle sending a message
  const handleSend = async () => {
    if (!userInput.trim()) return;

    // User's message
    const userMsg = {
      role: 'user',
      content: userInput,
    };

    // Add user's message immediately
    setMessages((prev) => [...prev, userMsg]);

    // Clear input
    setUserInput('');

    // Get response from API
    const botResponse = await getChatbotResponse(userInput);

    // Add bot's response
    const botMsg = {
      role: 'assistant',
      content: botResponse,
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  // 3. Handle "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <div className="chat-header">
        <h1>Fintech Chatbot</h1>
      </div>

      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === 'user' ? 'chat-bubble user-bubble' : 'chat-bubble bot-bubble'
            }
          >
            <div className="markdown">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
            
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble bot-bubble">
            <em>Thinking...</em>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Ask something about finance..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
