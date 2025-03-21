import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, BarChart2, ArrowLeft, PieChart, TrendingUp } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartPieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const Reports = () => {
  // Check if viewport is mobile sized
  const [isMobile, setIsMobile] = useState(false);
  const [showReportDetails, setShowReportDetails] = useState(false);

  // Maintenance data for charts
  const maintenanceData = [
    { name: 'Plumbing', value: 12 },
    { name: 'Electrical', value: 8 },
    { name: 'HVAC', value: 5 },
    { name: 'Appliances', value: 7 },
    { name: 'Structural', value: 3 },
  ];

  // Rent payment data for charts
  const paymentData = [
    { month: 'Jan', onTime: 28, late: 2 },
    { month: 'Feb', onTime: 27, late: 3 },
    { month: 'Mar', onTime: 29, late: 1 },
    { month: 'Apr', onTime: 25, late: 5 },
    { month: 'May', onTime: 26, late: 4 },
    { month: 'Jun', onTime: 28, late: 2 },
  ];

  // Financial data for charts
  const financialData = [
    { month: 'Jan', revenue: 50000, expenses: 20000 },
    { month: 'Feb', revenue: 52000, expenses: 22000 },
    { month: 'Mar', revenue: 48000, expenses: 19000 },
    { month: 'Apr', revenue: 51000, expenses: 21000 },
    { month: 'May', revenue: 53000, expenses: 20500 },
    { month: 'Jun', revenue: 49000, expenses: 19800 },
  ];

  // Color palette for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Dummy data for reports
  const reports = [
    {
      id: 1,
      type: 'Maintenance Report',
      dateRange: 'Oct 1, 2023 - Oct 15, 2023',
      downloadLink: '#',
      description: 'Summary of all maintenance requests and their status',
      chartType: 'pie',
      chartData: maintenanceData,
    },
    {
      id: 2,
      type: 'Rent Payment Report',
      dateRange: 'Sep 1, 2023 - Sep 30, 2023',
      downloadLink: '#',
      description: 'Overview of on-time and late rent payments',
      chartType: 'bar',
      chartData: paymentData,
    },
    {
      id: 3,
      type: 'Financial Summary',
      dateRange: 'Jan 1, 2023 - Oct 15, 2023',
      downloadLink: '#',
      description: 'Revenue and expense tracking over time',
      chartType: 'line',
      chartData: financialData,
    },
  ];

  const [selectedReport, setSelectedReport] = useState(reports[0]);

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

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    if (isMobile) {
      setShowReportDetails(true);
    }
  };

  const handleBackToList = () => {
    setShowReportDetails(false);
  };

  // Render appropriate chart based on report type
  const renderChart = () => {
    switch (selectedReport.chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartPieChart>
              <Pie
                data={selectedReport.chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={isMobile ? 80 : 100}
                fill="#8884d8"
                dataKey="value"
              >
                {selectedReport.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign="bottom" align="center" />
            </RechartPieChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={selectedReport.chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#0088FE" name="On Time" />
              <Bar dataKey="late" fill="#FF8042" name="Late" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={selectedReport.chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0088FE" name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#FF8042" name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">

      <div className="flex flex-col md:flex-row">
        {/* Report List - Hidden on mobile when viewing report details */}
        <div className={`${
          isMobile && showReportDetails ? 'hidden' : 'w-full md:w-1/3'
        } bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0`}>
          <h4 className="text-lg font-semibold mb-4">Generated Reports</h4>
          <div className="space-y-2">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => handleSelectReport(report)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedReport.id === report.id ? 'bg-gray-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{report.type}</p>
                    <p className="text-sm text-gray-500">{report.dateRange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Details - Full width on mobile when viewing details */}
        <div className={`${
          isMobile && !showReportDetails ? 'hidden' : 'w-full md:w-2/3 md:ml-6'
        } bg-white rounded-lg shadow-sm p-4 md:p-6`}>
          {/* Mobile back button */}
          {isMobile && (
            <button 
              onClick={handleBackToList}
              className="mb-4 flex items-center text-sm text-blue-600"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Reports
            </button>
          )}
          
          <h4 className="text-lg font-semibold mb-2">{selectedReport.type}</h4>
          <p className="text-sm text-gray-600 mb-4">{selectedReport.description}</p>
          
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">{selectedReport.dateRange}</span>
            </div>
            <a
              href={selectedReport.downloadLink}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Download className="h-5 w-5" />
              <span>Download Report</span>
            </a>
          </div>

          {/* Report Chart */}
          <div className="bg-gray-50 p-2 md:p-4 rounded-lg">
            <h5 className="text-md font-medium mb-4 text-center">
              {selectedReport.type} Visualization
            </h5>
            {renderChart()}
          </div>
          
          {/* Report summary stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-medium text-blue-800">Properties</h6>
                <BarChart2 className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold mt-2">12</p>
              <p className="text-xs text-blue-600 mt-1">+2 from last period</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-medium text-green-800">Completion Rate</h6>
                <PieChart className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">93%</p>
              <p className="text-xs text-green-600 mt-1">+5% from last period</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-medium text-purple-800">Avg. Response</h6>
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold mt-2">1.2 days</p>
              <p className="text-xs text-purple-600 mt-1">-0.3 days from last period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;