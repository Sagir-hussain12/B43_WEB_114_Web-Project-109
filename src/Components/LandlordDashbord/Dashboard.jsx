import React from 'react';
import { Building, Home, Users, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  // Dummy data for quick stats
  const quickStats = [
    {
      label: 'Total Properties',
      value: '3',
      icon: Building,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Units',
      value: '44',
      icon: Home,
      color: 'bg-green-500',
    },
    {
      label: 'Active Tenants',
      value: '38',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'Monthly Revenue',
      value: '$52,400',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  // Dummy data for recent alerts
  const recentAlerts = [
    {
      title: 'Maintenance Request',
      description: 'Unit 4B - Water heater replacement needed',
      time: '1 hour ago',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-800',
    },
    {
      title: 'Rent Payment Overdue',
      description: 'Unit 7A - 5 days overdue',
      time: '2 hours ago',
      priority: 'Medium',
      priorityColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      title: 'Lease Expiring',
      description: 'Unit 2C - Expires in 30 days',
      time: '1 day ago',
      priority: 'Low',
      priorityColor: 'bg-blue-100 text-blue-800',
    },
  ];

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center">
              <div className={`rounded-full ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Recent Alerts</h3>
        <div className="space-y-4">
          {recentAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-gray-500">{alert.description}</p>
                  <p className="text-xs text-gray-400">{alert.time}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${alert.priorityColor}`}
              >
                {alert.priority}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;