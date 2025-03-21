import React from "react";
import { Button } from "../common/ui/button";
import {
  PenTool as Tool,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export function RequestList() {
  const requests = [
    {
      id: 1,
      title: "Leaking Faucet",
      category: "Plumbing",
      status: "In Progress",
      urgency: "Medium",
      date: "2024-03-15",
      description: "Kitchen sink faucet is leaking continuously",
      updates: [
        { date: "2024-03-15", message: "Request received" },
        { date: "2024-03-16", message: "Technician assigned" },
      ],
    },
    {
      id: 2,
      title: "AC Not Cooling",
      category: "HVAC",
      status: "Pending",
      urgency: "High",
      date: "2024-03-14",
      description: "Air conditioning unit is not cooling properly",
      updates: [{ date: "2024-03-14", message: "Request received" }],
    },
    {
      id: 3,
      title: "Light Fixture Replacement",
      category: "Electrical",
      status: "Completed",
      urgency: "Low",
      date: "2024-03-10",
      description: "Living room ceiling light needs replacement",
      updates: [
        { date: "2024-03-10", message: "Request received" },
        { date: "2024-03-11", message: "Technician assigned" },
        { date: "2024-03-12", message: "Repair completed" },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "low":
        return <Tool className="h-5 w-5 text-blue-500" />;
      default:
        return <Tool className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <Button>New Request</Button>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <div key={request.id} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getUrgencyIcon(request.urgency)}
                <div>
                  <h3 className="font-semibold">{request.title}</h3>
                  <p className="text-sm text-gray-500">{request.category}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                  request.status
                )}`}
              >
                {request.status}
              </span>
            </div>

            <p className="mb-4 text-gray-600">{request.description}</p>

            <div className="mb-4 border-t pt-4">
              <h4 className="mb-2 font-medium">Updates</h4>
              <div className="space-y-2">
                {request.updates.map((update, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="font-medium">{update.date}:</span>
                    <span className="ml-2 text-gray-600">{update.message}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {request.status !== "Completed" && (
                <Button size="sm">Update Status</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
