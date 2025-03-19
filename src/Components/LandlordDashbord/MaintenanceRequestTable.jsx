import React from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const MaintenanceRequestTable = () => {
  // Dummy data for maintenance requests
  const maintenanceRequests = [
    {
      id: 1,
      property: 'Sunset Apartments',
      unit: '4B',
      issue: 'Water heater replacement',
      status: 'Pending',
      priority: 'High',
      date: '2023-10-15',
    },
    {
      id: 2,
      property: 'Ocean View Complex',
      unit: '7A',
      issue: 'Broken window',
      status: 'In Progress',
      priority: 'Medium',
      date: '2023-10-10',
    },
    {
      id: 3,
      property: 'Downtown Lofts',
      unit: '2C',
      issue: 'Leaky faucet',
      status: 'Completed',
      priority: 'Low',
      date: '2023-10-05',
    },
  ];

  // Status and priority icons
  const statusIcons = {
    Pending: <Clock className="h-4 w-4 text-yellow-500" />,
    'In Progress': <AlertCircle className="h-4 w-4 text-blue-500" />,
    Completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">Maintenance Requests</h3>

      {/* Filters */}
      <div className="mb-4 flex items-center space-x-4">
        <select className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="all">All Properties</option>
          <option value="sunset">Sunset Apartments</option>
          <option value="ocean">Ocean View Complex</option>
          <option value="downtown">Downtown Lofts</option>
        </select>
        <select className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Property</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Unit</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Issue</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {maintenanceRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{request.property}</td>
                <td className="px-6 py-4">{request.unit}</td>
                <td className="px-6 py-4">{request.issue}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {statusIcons[request.status]}
                    <span>{request.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColors[request.priority]}`}
                  >
                    {request.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{request.date}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceRequestTable;