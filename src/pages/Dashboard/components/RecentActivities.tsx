import React from 'react';
import { Package, User, DollarSign } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'product',
      title: 'New Product Added',
      description: 'Smart Watch X2 - Black Edition',
      time: '2 hours ago',
      icon: Package,
      iconColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'supplier',
      title: 'New Supplier',
      description: 'TechCorp Industries',
      time: '5 hours ago',
      icon: User,
      iconColor: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'sale',
      title: 'Large Order',
      description: '500 units - Smart Watch X1',
      time: '1 day ago',
      icon: DollarSign,
      iconColor: 'bg-yellow-100 text-yellow-600'
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50"
        >
          <div className={`p-2 rounded-full ${activity.iconColor}`}>
            <activity.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {activity.title}
            </p>
            <p className="text-sm text-gray-500">
              {activity.description}
            </p>
          </div>
          <div className="text-xs text-gray-500">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;