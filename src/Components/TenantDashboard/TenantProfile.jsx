import React, { useState } from "react";
import { Button } from "../common/ui/button";
import { Camera, Mail, Phone, Home, Calendar, Edit2 } from "lucide-react";

export function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B",
    moveInDate: "2023-06-15",
    leaseEnd: "2024-06-14",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle saving profile changes
    console.log("Saving profile:", profile);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <div className="mt-6">
          {/* Profile Picture */}
          <div className="mb-6 flex items-center space-x-4">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-24 w-24 rounded-full object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white hover:bg-primary/90">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-500">Tenant</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-gray-900">{profile.email}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-gray-900">{profile.phone}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Address
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <Home className="h-5 w-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-gray-900">{profile.address}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Move-in Date
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">
                  {new Date(profile.moveInDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Information */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Lease Information</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Lease Start Date</p>
            <p className="font-medium">
              {new Date(profile.moveInDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lease End Date</p>
            <p className="font-medium">
              {new Date(profile.leaseEnd).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Documents</h3>
        <div className="mt-4 space-y-4">
          {["Lease Agreement", "Move-in Checklist", "Building Rules"].map(
            (doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <Edit2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{doc}</p>
                    <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
