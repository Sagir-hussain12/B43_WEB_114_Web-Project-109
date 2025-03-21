import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle, Filter, ChevronDown, ChevronUp, Plus, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

const MaintenanceRequestTable = () => {
  // State for responsive design
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    property: 'all',
    status: 'all',
    priority: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Extended dummy data for maintenance requests
  const allMaintenanceRequests = [
    {
      id: 1,
      property: 'Sunset Apartments',
      unit: '4B',
      issue: 'Water heater replacement',
      description: 'Tenant reported no hot water for 2 days. Water heater is over 10 years old and likely needs replacement.',
      status: 'Pending',
      priority: 'High',
      date: '2023-10-15',
      assignee: 'Mike Johnson',
      estimatedCost: '$850',
    },
    {
      id: 2,
      property: 'Ocean View Complex',
      unit: '7A',
      issue: 'Broken window',
      description: 'Window in living room was cracked during recent storm. Glass needs to be replaced and frame inspected for damage.',
      status: 'In Progress',
      priority: 'Medium',
      date: '2023-10-10',
      assignee: 'Sarah Williams',
      estimatedCost: '$320',
    },
    {
      id: 3,
      property: 'Downtown Lofts',
      unit: '2C',
      issue: 'Leaky faucet',
      description: 'Kitchen sink faucet is dripping constantly. Requested repair during business hours.',
      status: 'Completed',
      priority: 'Low',
      date: '2023-10-05',
      assignee: 'Tom Davis',
      estimatedCost: '$75',
    },
    {
      id: 4,
      property: 'Hillside Condos',
      unit: '12D',
      issue: 'HVAC system failure',
      description: 'Air conditioning not working during heat wave. Tenant has elderly parents visiting and needs urgent repair.',
      status: 'Pending',
      priority: 'High',
      date: '2023-10-16',
      assignee: 'Unassigned',
      estimatedCost: '$1200',
    },
    {
      id: 5,
      property: 'Sunset Apartments',
      unit: '1A',
      issue: 'Dishwasher not draining',
      description: 'Dishwasher fills with water but doesnt drain properly. Tenant has tried cleaning filters without success.',
      status: 'In Progress',
      priority: 'Medium',
      date: '2023-10-12',
      assignee: 'Mike Johnson',
      estimatedCost: '$150',
    },
    {
      id: 6,
      property: 'Riverfront Towers',
      unit: '8F',
      issue: 'Ceiling leak',
      description: 'Water stain on ceiling growing after recent rainfall. Possible roof leak affecting top floor unit.',
      status: 'In Progress',
      priority: 'High',
      date: '2023-10-14',
      assignee: 'Sarah Williams',
      estimatedCost: '$550',
    },
    {
      id: 7,
      property: 'Downtown Lofts',
      unit: '5B',
      issue: 'Electrical outlet not working',
      description: 'Two outlets in bedroom not functioning. Tenant checked breaker box already.',
      status: 'Completed',
      priority: 'Medium',
      date: '2023-10-08',
      assignee: 'Tom Davis',
      estimatedCost: '$120',
    },
    {
      id: 8,
      property: 'Ocean View Complex',
      unit: '3C',
      issue: 'Garbage disposal jammed',
      description: 'Kitchen sink garbage disposal makes loud noise but doesnt spin. May need replacement.',
      status: 'Completed',
      priority: 'Low',
      date: '2023-10-07',
      assignee: 'Sarah Williams',
      estimatedCost: '$95',
    },
  ];

  // Status and priority icons/colors
  const statusIcons = {
    Pending: <Clock className="h-4 w-4 text-yellow-500" />,
    'In Progress': <AlertCircle className="h-4 w-4 text-blue-500" />,
    Completed: <CheckCircle className="h-4 w-4 text-green-500" />,
    Cancelled: <XCircle className="h-4 w-4 text-red-500" />,
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle row expansion for mobile view
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle sort functionality
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedRequests = [...allMaintenanceRequests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Apply filters
  const filteredRequests = sortedRequests.filter(request => {
    return (filters.property === 'all' || request.property === filters.property) &&
           (filters.status === 'all' || request.status === filters.status) &&
           (filters.priority === 'all' || request.priority === filters.priority);
  });

  // Get unique values for filters
  const properties = [...new Set(allMaintenanceRequests.map(req => req.property))];
  const statuses = [...new Set(allMaintenanceRequests.map(req => req.status))];
  const priorities = [...new Set(allMaintenanceRequests.map(req => req.priority))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-2 md:p-4">
      <h3 className="mb-3 md:mb-6 text-xl md:text-2xl font-bold">Maintenance Requests</h3>

      {/* Action buttons */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)} 
          className="px-3 py-2 md:px-4 md:py-2 bg-white border rounded-lg shadow-sm flex items-center text-sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          <span>Filter</span>
        </button>
        
        <button className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg shadow-sm flex items-center text-sm">
          <Plus className="h-4 w-4 mr-2" />
          <span>New Request</span>
        </button>
      </div>

      {/* Filters - Responsive */}
      {showFilters && (
        <div className="mb-4 bg-white p-3 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
              <select 
                name="property"
                value={filters.property} 
                onChange={handleFilterChange}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Properties</option>
                {properties.map(property => (
                  <option key={property} value={property}>{property}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      {!isMobile && (
        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => requestSort('property')}
                >
                  <div className="flex items-center">
                    Property
                    {sortConfig.key === 'property' && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Unit</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Issue</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig.key === 'status' && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => requestSort('priority')}
                >
                  <div className="flex items-center">
                    Priority
                    {sortConfig.key === 'priority' && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => requestSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    {sortConfig.key === 'date' && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Assignee</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Est. Cost</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{request.property}</td>
                  <td className="px-4 py-3 text-sm">{request.unit}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="max-w-xs truncate" title={request.issue}>
                      {request.issue}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1">
                      {statusIcons[request.status]}
                      <span>{request.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColors[request.priority]}`}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{request.date}</td>
                  <td className="px-4 py-3 text-sm">{request.assignee}</td>
                  <td className="px-4 py-3 text-sm">{request.estimatedCost}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleRowExpansion(request.id)}
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[request.priority]}`}
                    >
                      {request.priority}
                    </span>
                    <div className="flex items-center space-x-1">
                      {statusIcons[request.status]}
                      <span className="text-sm">{request.status}</span>
                    </div>
                  </div>
                  <h4 className="font-medium">{request.issue}</h4>
                  <div className="text-sm text-gray-500">
                    {request.property} - Unit {request.unit}
                  </div>
                </div>
                <div>
                  {expandedRow === request.id ? 
                    <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </div>
              
              {expandedRow === request.id && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                    <div className="text-gray-500">Date:</div>
                    <div>{request.date}</div>
                    
                    <div className="text-gray-500">Assignee:</div>
                    <div>{request.assignee}</div>
                    
                    <div className="text-gray-500">Est. Cost:</div>
                    <div>{request.estimatedCost}</div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-gray-500 text-sm mb-1">Description:</div>
                    <p className="text-sm">{request.description}</p>
                  </div>
                  
                  <div className="flex space-x-2 pt-2 border-t border-gray-100">
                    <button className="flex-1 py-2 text-center text-blue-600 text-sm">
                      <div className="flex items-center justify-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </div>
                    </button>
                    <button className="flex-1 py-2 text-center text-gray-600 text-sm">
                      <div className="flex items-center justify-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </div>
                    </button>
                    <button className="flex-1 py-2 text-center text-red-600 text-sm">
                      <div className="flex items-center justify-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{allMaintenanceRequests.length}</span> requests
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-sm">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border rounded text-sm">2</button>
          <button className="px-3 py-1 border rounded text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestTable;