import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Components/ui/button';
import { Home, Users, Key } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">PropertyConnect</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">PropertyConnect</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Streamline your property management experience. Choose your role to get started.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-12">
          {/* Tenant Card */}
          <div 
            className="group relative cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            onClick={() => navigate('/tenant-dashboard')}
          >
            <div className="flex items-center justify-center">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-4 text-center text-2xl font-semibold text-gray-900">
              I'm a Tenant
            </h2>
            <p className="mt-2 text-center text-gray-500">
              Access your tenant portal, submit maintenance requests, and communicate with your landlord.
            </p>
            <Button 
              className="mt-6 w-full"
              onClick={() => navigate('/tenant-dashboard')}
            >
              Enter as Tenant
            </Button>
          </div>

          {/* Landlord Card */}
          <div 
            className="group relative cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            onClick={() => navigate('/landlord-dashboard')}
          >
            <div className="flex items-center justify-center">
              <Key className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-4 text-center text-2xl font-semibold text-gray-900">
              I'm a Landlord
            </h2>
            <p className="mt-2 text-center text-gray-500">
              Manage your properties, track maintenance requests, and stay connected with your tenants.
            </p>
            <Button 
              className="mt-6 w-full"
              onClick={() => navigate('/landlord-dashboard')}
            >
              Enter as Landlord
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Why Choose PropertyConnect?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: 'Easy Communication',
                description: 'Direct messaging between tenants and landlords for quick resolution of issues.',
              },
              {
                title: 'Maintenance Tracking',
                description: 'Submit and track maintenance requests with real-time updates.',
              },
              {
                title: 'Payment Management',
                description: 'Secure rent payments and complete payment history tracking.',
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 PropertyConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}