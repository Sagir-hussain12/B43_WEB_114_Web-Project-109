import React, { useState } from 'react';
import { MessageSquare, Send, Check, CheckCircle } from 'lucide-react';

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
          text: 'Thanks for letting me know. I’ll send a technician tomorrow.',
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

  return (
    <div className="flex h-[calc(100vh-160px)]">
      {/* Conversation List */}
      <div className="w-1/4 border-r bg-white">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Conversations</h3>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                activeConversation.id === conversation.id ? 'bg-gray-50' : ''
              }`}
            >
              <p className="font-medium">{conversation.tenant}</p>
              <p className="text-sm text-gray-500">{conversation.property}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white">
          <h3 className="text-lg font-semibold">
            {activeConversation.tenant} - {activeConversation.property}
          </h3>
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
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'landlord'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.text}</p>
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
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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