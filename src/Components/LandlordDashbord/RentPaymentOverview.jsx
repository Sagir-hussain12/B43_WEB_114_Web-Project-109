import React, { useState } from 'react';
import { DollarSign, CheckCircle, AlertCircle, Clock, ArrowUp, ArrowDown, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const RentPaymentOverview = () => {
  // Extended dummy data for rent payments
  const allRentPayments = [
    {
      id: 1,
      property: 'Sunset Apartments',
      tenant: 'John Doe',
      amount: 1200,
      dueDate: '2023-10-01',
      status: 'Paid',
      paidDate: '2023-09-28',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      property: 'Ocean View Complex',
      tenant: 'Jane Smith',
      amount: 1500,
      dueDate: '2023-10-01',
      status: 'Overdue',
      daysLate: 5,
      paymentMethod: 'Credit Card'
    },
    {
      id: 3,
      property: 'Downtown Lofts',
      tenant: 'Alice Johnson',
      amount: 1000,
      dueDate: '2023-10-01',
      status: 'Pending',
      paymentMethod: 'Check'
    },
    {
      id: 4,
      property: 'Maple Heights',
      tenant: 'Robert Wilson',
      amount: 950,
      dueDate: '2023-10-05',
      status: 'Paid',
      paidDate: '2023-10-03',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 5,
      property: 'Pine Valley Estate',
      tenant: 'Emily Davis',
      amount: 1350,
      dueDate: '2023-10-05',
      status: 'Pending',
      paymentMethod: 'PayPal'
    },
    {
      id: 6,
      property: 'Highland Towers',
      tenant: 'Michael Brown',
      amount: 1700,
      dueDate: '2023-09-30',
      status: 'Overdue',
      daysLate: 7,
      paymentMethod: 'Credit Card'
    },
    {
      id: 7,
      property: 'Riverside Commons',
      tenant: 'Sarah Miller',
      amount: 1150,
      dueDate: '2023-10-10',
      status: 'Paid',
      paidDate: '2023-10-08',
      paymentMethod: 'Venmo'
    },
    {
      id: 8,
      property: 'Lakeside Condos',
      tenant: 'Daniel Taylor',
      amount: 1600,
      dueDate: '2023-10-05',
      status: 'Overdue',
      daysLate: 2,
      paymentMethod: 'Bank Transfer'
    },
  ];

  // State variables for interactive functionality
  const [rentPayments, setRentPayments] = useState(allRentPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [statusFilter, setStatusFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [remindMessage, setRemindMessage] = useState('');
  const itemsPerPage = 5;

  // Calculate totals
  const summary = {
    totalPaid: rentPayments.filter(p => p.status === 'Paid').reduce((sum, payment) => sum + payment.amount, 0),
    totalOverdue: rentPayments.filter(p => p.status === 'Overdue').reduce((sum, payment) => sum + payment.amount, 0),
    totalPending: rentPayments.filter(p => p.status === 'Pending').reduce((sum, payment) => sum + payment.amount, 0),
    countPaid: rentPayments.filter(p => p.status === 'Paid').length,
    countOverdue: rentPayments.filter(p => p.status === 'Overdue').length,
    countPending: rentPayments.filter(p => p.status === 'Pending').length,
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US')}`;
  };

  // Sort function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key) return rentPayments;
    
    return [...rentPayments].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter function
  const handleFilter = (status) => {
    setStatusFilter(status);
    if (status === 'All') {
      setRentPayments(allRentPayments);
    } else {
      setRentPayments(allRentPayments.filter(payment => payment.status === status));
    }
    setCurrentPage(1);
  };

  // Search function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = allRentPayments.filter(payment => 
      payment.property.toLowerCase().includes(e.target.value.toLowerCase()) ||
      payment.tenant.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRentPayments(filtered);
    setCurrentPage(1);
  };

  // Send reminder function
  const sendReminder = (id) => {
    // In a real app, this would send an API request
    alert(`Reminder sent to tenant for payment #${id}: ${remindMessage || "Your rent payment is due soon."}`);
    setRemindMessage('');
  };

  // Toggle expanded row
  const toggleExpand = (id) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  // Status icons
  const statusIcons = {
    Paid: <CheckCircle className="h-4 w-4 text-green-500" />,
    Overdue: <AlertCircle className="h-4 w-4 text-red-500" />,
    Pending: <Clock className="h-4 w-4 text-yellow-500" />,
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSortedData().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rentPayments.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get sort icon for table header
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4 inline ml-1" /> : <ArrowDown className="h-4 w-4 inline ml-1" />;
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-full">
      <h3 className="mb-4 text-xl md:text-2xl font-bold">Rent Payments Overview</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Paid</p>
              <p className="text-xl md:text-2xl font-semibold">{formatCurrency(summary.totalPaid)}</p>
              <p className="text-xs text-gray-500">{summary.countPaid} payments</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-red-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Overdue</p>
              <p className="text-xl md:text-2xl font-semibold">{formatCurrency(summary.totalOverdue)}</p>
              <p className="text-xs text-gray-500">{summary.countOverdue} payments</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Pending</p>
              <p className="text-xl md:text-2xl font-semibold">{formatCurrency(summary.totalPending)}</p>
              <p className="text-xs text-gray-500">{summary.countPending} payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
            placeholder="Search by property or tenant"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="inline-flex items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm">Filter:</span>
          </div>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l-lg ${statusFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => handleFilter('All')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm ${statusFilter === 'Paid' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              onClick={() => handleFilter('Paid')}
            >
              Paid
            </button>
            <button 
              className={`px-3 py-1 text-sm ${statusFilter === 'Overdue' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
              onClick={() => handleFilter('Overdue')}
            >
              Overdue
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r-lg ${statusFilter === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}
              onClick={() => handleFilter('Pending')}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Rent Payments Table - Responsive Design */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        {/* Desktop view table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('property')}
                >
                  Property {getSortIcon('property')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('tenant')}
                >
                  Tenant {getSortIcon('tenant')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  Amount {getSortIcon('amount')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('dueDate')}
                >
                  Due Date {getSortIcon('dueDate')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status {getSortIcon('status')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((payment) => (
                <React.Fragment key={payment.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{payment.property}</td>
                    <td className="px-4 py-3 text-sm">{payment.tenant}</td>
                    <td className="px-4 py-3 text-sm">{formatCurrency(payment.amount)}</td>
                    <td className="px-4 py-3 text-sm">{payment.dueDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        {statusIcons[payment.status]}
                        <span className={
                          payment.status === 'Paid' ? 'text-green-600' : 
                          payment.status === 'Overdue' ? 'text-red-600' : 'text-yellow-600'
                        }>{payment.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                        onClick={() => toggleExpand(payment.id)}
                      >
                        {expanded === payment.id ? 'Hide' : 'View'}
                      </button>
                      {payment.status !== 'Paid' && (
                        <button 
                          className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                          onClick={() => toggleExpand(payment.id)}
                        >
                          Remind
                        </button>
                      )}
                    </td>
                  </tr>
                  {expanded === payment.id && (
                    <tr>
                      <td colSpan="6" className="px-4 py-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-700">Payment Details</h4>
                            <p className="text-sm">Property: {payment.property}</p>
                            <p className="text-sm">Tenant: {payment.tenant}</p>
                            <p className="text-sm">Amount: {formatCurrency(payment.amount)}</p>
                            <p className="text-sm">Due Date: {payment.dueDate}</p>
                            <p className="text-sm">Payment Method: {payment.paymentMethod}</p>
                            {payment.status === 'Paid' && <p className="text-sm">Paid Date: {payment.paidDate}</p>}
                            {payment.status === 'Overdue' && <p className="text-sm">Days Late: {payment.daysLate}</p>}
                          </div>
                          {payment.status !== 'Paid' && (
                            <div>
                              <h4 className="font-medium text-gray-700">Send Reminder</h4>
                              <textarea
                                className="w-full p-2 border border-gray-300 rounded-md text-sm mt-2"
                                rows="3"
                                placeholder="Enter reminder message..."
                                value={remindMessage}
                                onChange={(e) => setRemindMessage(e.target.value)}
                              ></textarea>
                              <button 
                                className="mt-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                onClick={() => sendReminder(payment.id)}
                              >
                                Send Reminder
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view cards */}
        <div className="md:hidden">
          {currentItems.map((payment) => (
            <div key={payment.id} className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{payment.property}</h4>
                  <p className="text-sm text-gray-600">{payment.tenant}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {statusIcons[payment.status]}
                  <span className={
                    payment.status === 'Paid' ? 'text-green-600 text-sm' : 
                    payment.status === 'Overdue' ? 'text-red-600 text-sm' : 'text-yellow-600 text-sm'
                  }>{payment.status}</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-sm">
                  <span className="text-gray-500">Amount:</span> {formatCurrency(payment.amount)}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Due:</span> {payment.dueDate}
                </div>
              </div>
              
              <div className="flex justify-between mt-3">
                <button 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                  onClick={() => toggleExpand(payment.id)}
                >
                  {expanded === payment.id ? 'Hide Details' : 'View Details'}
                </button>
                {payment.status !== 'Paid' && (
                  <button 
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                    onClick={() => toggleExpand(payment.id)}
                  >
                    Remind
                  </button>
                )}
              </div>
              
              {expanded === payment.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Payment Details</h4>
                    <p className="text-sm">Payment Method: {payment.paymentMethod}</p>
                    {payment.status === 'Paid' && <p className="text-sm">Paid Date: {payment.paidDate}</p>}
                    {payment.status === 'Overdue' && <p className="text-sm">Days Late: {payment.daysLate}</p>}
                  </div>
                  
                  {payment.status !== 'Paid' && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Send Reminder</h4>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        rows="3"
                        placeholder="Enter reminder message..."
                        value={remindMessage}
                        onChange={(e) => setRemindMessage(e.target.value)}
                      ></textarea>
                      <button 
                        className="mt-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm w-full"
                        onClick={() => sendReminder(payment.id)}
                      >
                        Send Reminder
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, rentPayments.length)} of {rentPayments.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentPaymentOverview;