import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Check, CheckCircle, Menu, ArrowLeft } from 'lucide-react';

const LandlordChat = () => {
  // Dummy data for chat conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      tenant: 'John Doe',
      property: 'Sunset Apartments',
      messages: [
        {
          id: 1,
          text: 'Hi, the water heater in unit 4B is not working.',
          sender: 'tenant',
          timestamp: '2023-10-15 10:30 AM',
          status: 'read',
        },
        {
          id: 2,
          text: 'Thanks for letting me know. Ill send a technician tomorrow.',
          sender: 'landlord',
          timestamp: '2023-10-15 10:35 AM',
          status: 'delivered',
        },
      ],
    },
    {
      id: 2,
      tenant: 'Jane Smith',
      property: 'Ocean View Complex',
      messages: [
        {
          id: 1,
          text: 'The window in unit 7A is broken.',
          sender: 'tenant',
          timestamp: '2023-10-10 09:00 AM',
          status: 'read',
        },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showConversationList, setShowConversationList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile sized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === activeConversation.id) {
        return {
          ...conversation,
          messages: [
            ...conversation.messages,
            {
              id: conversation.messages.length + 1,
              text: newMessage,
              sender: 'landlord',
              timestamp: new Date().toLocaleString(),
              status: 'sent',
            },
          ],
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  // Handle selecting a conversation and showing the chat on mobile
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  // Handle back button on mobile
  const handleBackToList = () => {
    setShowConversationList(true);
  };

  // Handle pressing Enter to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen md:h-[calc(100vh-160px)] bg-gray-50">
      {/* Conversation List - Hidden on mobile when viewing a chat */}
      <div 
        className={`${
          isMobile
            ? showConversationList 
              ? 'w-full' 
              : 'hidden'
            : 'w-1/4'
        } border-r bg-white overflow-hidden`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Conversations</h3>
          {isMobile && !showConversationList && (
            <button onClick={handleBackToList} className="p-1">
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                activeConversation.id === conversation.id ? 'bg-gray-50' : ''
              }`}
            >
              <p className="font-medium">{conversation.tenant}</p>
              <p className="text-sm text-gray-500">{conversation.property}</p>
              {/* Show preview of last message */}
              {conversation.messages.length > 0 && (
                <p className="text-xs text-gray-400 truncate mt-1">
                  {conversation.messages[conversation.messages.length - 1].text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window - Full width on mobile when showing chat */}
      <div 
        className={`${
          isMobile
            ? showConversationList 
              ? 'hidden' 
              : 'w-full'
            : 'w-3/4'
        } flex flex-col bg-gray-50 h-full`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b bg-white flex items-center">
          {isMobile && (
            <button 
              onClick={handleBackToList} 
              className="mr-2 p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div>
            <h3 className="text-lg font-semibold">
              {activeConversation.tenant}
            </h3>
            <p className="text-sm text-gray-500">
              {activeConversation.property}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'landlord' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-lg ${
                  message.sender === 'landlord'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="break-words">{message.text}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{message.timestamp}</span>
                  {message.sender === 'landlord' && (
                    <span className="ml-2">
                      {message.status === 'read' ? (
                        <CheckCircle className="h-3 w-3 text-blue-500" />
                      ) : message.status === 'delivered' ? (
                        <Check className="h-3 w-3 text-blue-500" />
                      ) : (
                        <Check className="h-3 w-3 text-gray-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-2 sm:p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordChat;