import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { Button } from './ui/button';

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    type: 'maintenance',
    message: 'Your maintenance request #1234 has been approved.',
    time: '2 hours ago',
    isRead: false
  },
  {
    id: 2,
    type: 'payment',
    message: 'Reminder: Your rent payment is due in 3 days.',
    time: '1 day ago',
    isRead: false
  },
  {
    id: 3,
    type: 'message',
    message: 'You have a new message from your landlord.',
    time: '2 days ago',
    isRead: true
  }
];

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const dropdownRef = useRef(null);

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Get notification icon based on type
  const getNotificationTypeIcon = (type) => {
    switch(type) {
      case 'maintenance':
        return <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">🔧</div>;
      case 'payment':
        return <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">💰</div>;
      case 'message':
        return <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">💬</div>;
      default:
        return <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">📌</div>;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          {/* Dropdown Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary-dark"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-b px-4 py-3 hover:bg-gray-50 ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    {/* Notification Type Icon */}
                    {getNotificationTypeIcon(notification.type)}
                    
                    {/* Notification Content */}
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium">{notification.message}</div>
                      <div className="mt-1 text-xs text-gray-500">{notification.time}</div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-1">
                      {!notification.isRead && (
                        <button
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        onClick={() => deleteNotification(notification.id)}
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="h-10 w-10 text-gray-300" />
                <p className="mt-2 text-gray-500">No notifications</p>
              </div>
            )}
          </div>

          {/* Dropdown Footer */}
          <div className="border-t px-4 py-2">
            <button
              className="w-full rounded-md py-2 text-center text-sm text-primary hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};