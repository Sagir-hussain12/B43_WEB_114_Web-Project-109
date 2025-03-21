import React, { useState } from "react";
import { Button } from "../common/ui/button";
import { Send, Paperclip, Image as ImageIcon } from "lucide-react";

export function TenantChat() {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      sender: "tenant",
      message:
        "Hi, I wanted to ask about the maintenance request I submitted yesterday.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "landlord",
      message:
        "Hello! Yes, I received it. The plumber is scheduled for tomorrow morning between 9-11 AM. Will you be available?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "tenant",
      message:
        "Yes, I ll be home during that time. Thank you for the quick response!",
      timestamp: "10:33 AM",
    },
    {
      id: 4,
      sender: "landlord",
      message: "Perfect! Let me know if you need anything else.",
      timestamp: "10:34 AM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col rounded-lg bg-white shadow-sm">
      {/* Chat Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-primary/10">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces"
              alt="Landlord"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">John Smith</h2>
            <p className="text-sm text-gray-500">Property Manager</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "tenant" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.sender === "tenant"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{msg.message}</p>
                <p
                  className={`mt-1 text-right text-xs ${
                    msg.sender === "tenant" ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <input
            type="text"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="mr-2 h-5 w-5" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
