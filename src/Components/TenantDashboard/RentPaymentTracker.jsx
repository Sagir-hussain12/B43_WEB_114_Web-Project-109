import React from "react";
import { Button } from "../common/ui/button";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

export function RentPaymentTracker() {
  const payments = [
    {
      id: 1,
      month: "March 2024",
      amount: 1200,
      dueDate: "2024-03-01",
      status: "Paid",
      paymentDate: "2024-02-28",
    },
    {
      id: 2,
      month: "April 2024",
      amount: 1200,
      dueDate: "2024-04-01",
      status: "Pending",
    },
    {
      id: 3,
      month: "May 2024",
      amount: 1200,
      dueDate: "2024-05-01",
      status: "Upcoming",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rent Payment Tracker</h2>
        <Button>
          <DollarSign className="mr-2 h-5 w-5" />
          Make Payment
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Next Payment</h3>
          <p className="mt-2 text-3xl font-semibold">$1,200</p>
          <p className="mt-1 text-sm text-gray-500">Due April 1, 2024</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
          <p className="mt-2 text-3xl font-semibold">Current</p>
          <p className="mt-1 text-sm text-gray-500">Last paid: Feb 28, 2024</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Total Paid (2024)
          </h3>
          <p className="mt-2 text-3xl font-semibold">$3,600</p>
          <p className="mt-1 text-sm text-gray-500">3 payments</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold">Payment History</h3>
        </div>
        <div className="divide-y">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(payment.status)}
                <div>
                  <p className="font-medium">{payment.month}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(payment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">${payment.amount}</p>
                  {payment.paymentDate && (
                    <p className="text-sm text-gray-500">
                      Paid: {new Date(payment.paymentDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 font-semibold">Payment Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Auto-Pay</p>
                <p className="text-sm text-gray-500">
                  Enabled for monthly rent
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
