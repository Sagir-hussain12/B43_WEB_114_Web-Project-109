import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

// Common FAQs related to tenants, landlords, and property management
const FAQs = [
  {
    question: "How do I submit a maintenance request?",
    answer: "You can submit a maintenance request by navigating to the Maintenance tab and filling out the request form with details about the issue."
  },
  {
    question: "When is my rent due?",
    answer: "Rent is typically due on the 1st of each month. You can check your specific due date in the Payments section."
  },
  {
    question: "How do I update my personal information?",
    answer: "You can update your personal information by going to the Profile tab and editing your details."
  },
  {
    question: "What should I do if I'm going to be late with rent?",
    answer: "If you anticipate being late with rent, please contact your landlord as soon as possible through the Messages tab to discuss options."
  },
  {
    question: "How do I report an emergency maintenance issue?",
    answer: "For emergency maintenance issues like water leaks or no heat, submit a maintenance request and mark it as 'Emergency', then contact your landlord directly."
  },
  {
    question: "How do I renew my lease?",
    answer: "To discuss lease renewal, please send a message to your landlord through the Messages tab or contact the property management office."
  }
];

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm your PropertyConnect assistant. How can I help you today?" },
    { type: 'bot', text: "You can ask me questions about maintenance requests, rent payments, or your lease." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(FAQs.slice(0, 3));
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target) && 
          !event.target.closest('.chatbot-toggle')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages([...messages, { type: 'user', text: inputValue }]);
    
    // Process input and generate response
    const userQuestion = inputValue.toLowerCase();
    const matchingFAQ = FAQs.find(faq => 
      faq.question.toLowerCase().includes(userQuestion) || 
      userQuestion.includes(faq.question.toLowerCase().replace(/[?]/g, '').trim())
    );

    // Delayed bot response to feel more natural
    setTimeout(() => {
      if (matchingFAQ) {
        setMessages(prev => [...prev, { type: 'bot', text: matchingFAQ.answer }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "I'm not sure about that. Would you like to ask about maintenance requests, rent payments, or contacting your landlord?" 
        }]);
        
        // Show new suggestions
        setSuggestions(FAQs.slice(0, 3));
      }
    }, 600);

    setInputValue('');
  };

  const handleSuggestionClick = (suggestion) => {
    setMessages([
      ...messages, 
      { type: 'user', text: suggestion.question },
      { type: 'bot', text: suggestion.answer }
    ]);
    setSuggestions([]);
  };

  return (
    <>
      {/* Floating chat button */}
      <button 
        className="chatbot-toggle fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
      
      {/* Chat interface */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 z-50 w-80 rounded-lg bg-white shadow-xl sm:w-96"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between rounded-t-lg bg-primary p-4 text-white">
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              <h3 className="font-semibold">PropertyConnect Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
              >
                <div 
                  className={`rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800'
                  } max-w-[80%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* FAQ suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-500">Suggested questions:</p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full rounded-md bg-gray-100 p-2 text-left text-sm text-gray-800 hover:bg-gray-200"
                    >
                      {suggestion.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t p-3">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-l-md border border-r-0 p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                className="rounded-r-md bg-primary p-2 text-white hover:bg-primary-dark"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};