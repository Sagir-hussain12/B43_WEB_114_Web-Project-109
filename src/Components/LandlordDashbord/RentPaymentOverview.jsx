import React from 'react';
import { DollarSign, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const RentPaymentOverview = () => {
  // Dummy data for rent payments
  const rentPayments = [
    {
      id: 1,
      property: 'Sunset Apartments',
      tenant: 'John Doe',
      amount: '$1,200',
      dueDate: '2023-10-01',
      status: 'Paid',
    },
    {
      id: 2,
      property: 'Ocean View Complex',
      tenant: 'Jane Smith',
      amount: '$1,500',
      dueDate: '2023-10-01',
      status: 'Overdue',
    },
    {
      id: 3,
      property: 'Downtown Lofts',
      tenant: 'Alice Johnson',
      amount: '$1,000',
      dueDate: '2023-10-01',
      status: 'Pending',
    },
  ];

  // Status icons
  const statusIcons = {
    Paid: <CheckCircle className="h-4 w-4 text-green-500" />,
    Overdue: <AlertCircle className="h-4 w-4 text-red-500" />,
    Pending: <Clock className="h-4 w-4 text-yellow-500" />,
  };

  // Summary data
  const summary = {
    totalPaid: '$3,700',
    totalOverdue: '$1,500',
    totalPending: '$1,000',
  };

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">Rent Payments Overview</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Paid</p>
              <p className="text-2xl font-semibold">{summary.totalPaid}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-red-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Overdue</p>
              <p className="text-2xl font-semibold">{summary.totalOverdue}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Pending</p>
              <p className="text-2xl font-semibold">{summary.totalPending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rent Payments Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Property</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tenant</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rentPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{payment.property}</td>
                <td className="px-6 py-4">{payment.tenant}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">{payment.dueDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {statusIcons[payment.status]}
                    <span>{payment.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-4 text-red-600 hover:text-red-800">Remind</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentPaymentOverview;