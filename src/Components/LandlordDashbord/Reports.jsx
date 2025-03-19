import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart2 } from 'lucide-react';

const Reports = () => {
  // Dummy data for reports
  const reports = [
    {
      id: 1,
      type: 'Maintenance Report',
      dateRange: 'Oct 1, 2023 - Oct 15, 2023',
      downloadLink: '#',
    },
    {
      id: 2,
      type: 'Rent Payment Report',
      dateRange: 'Sep 1, 2023 - Sep 30, 2023',
      downloadLink: '#',
    },
    {
      id: 3,
      type: 'Financial Summary',
      dateRange: 'Jan 1, 2023 - Oct 15, 2023',
      downloadLink: '#',
    },
  ];

  const [selectedReport, setSelectedReport] = useState(reports[0]);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">Reports</h3>

      <div className="flex">
        {/* Report List */}
        <div className="w-1/3 bg-white rounded-lg shadow-sm p-4">
          <h4 className="text-lg font-semibold mb-4">Generated Reports</h4>
          <div className="space-y-2">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedReport.id === report.id ? 'bg-gray-50' : ''
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

        {/* Report Details */}
        <div className="w-2/3 ml-6 bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-4">{selectedReport.type}</h4>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
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

          {/* Report Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-center h-40">
              <BarChart2 className="h-10 w-10 text-gray-400" />
              <p className="text-gray-500">Report preview will be shown here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;