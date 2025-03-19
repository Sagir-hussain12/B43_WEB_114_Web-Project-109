import React from 'react';
import { Building, Home, Users, MapPin } from 'lucide-react';

const PropertyList = () => {
  // Dummy data for properties
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, Los Angeles',
      units: 12,
      occupancyRate: '92%',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&fit=crop',
    },
    {
      id: 2,
      name: 'Ocean View Complex',
      address: '456 Beach Road, Miami',
      units: 24,
      occupancyRate: '88%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&fit=crop',
    },
    {
      id: 3,
      name: 'Downtown Lofts',
      address: '789 Main St, Chicago',
      units: 8,
      occupancyRate: '100%',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&fit=crop',
    },
  ];

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">Your Properties</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Property Image */}
            <img
              src={property.image}
              alt={property.name}
              className="h-48 w-full object-cover"
            />

            {/* Property Details */}
            <div className="p-4">
              <h4 className="text-xl font-semibold">{property.name}</h4>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <MapPin className="mr-2 h-4 w-4" />
                {property.address}
              </p>

              {/* Units and Occupancy */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {property.units} Units
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {property.occupancyRate} Occupied
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;