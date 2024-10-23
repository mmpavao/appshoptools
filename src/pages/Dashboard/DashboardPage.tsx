import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  TrendingUp, 
  Trophy,
  UserPlus,
  PackagePlus,
  Calculator,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BarChart } from './components/BarChart';
import CurrencyWidget from './components/CurrencyWidget';
import RecentActivities from './components/RecentActivities';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'Total Products', value: '150', icon: Package, color: 'bg-blue-500' },
    { title: 'Total Suppliers', value: '32', icon: Users, color: 'bg-green-500' },
    { title: 'Countries Served', value: '12', icon: TrendingUp, color: 'bg-purple-500' },
    { 
      title: 'Winning Product', 
      value: 'Smart Watch X1', 
      icon: Trophy, 
      color: 'bg-yellow-500',
      subtitle: '2,450 units sold'
    },
  ];

  const quickActions = [
    { 
      title: 'Add Supplier', 
      icon: UserPlus, 
      color: 'bg-blue-100 text-blue-600',
      onClick: () => navigate('/suppliers', { state: { openAddModal: true } })
    },
    { 
      title: 'Add Product', 
      icon: PackagePlus, 
      color: 'bg-green-100 text-green-600',
      onClick: () => navigate('/products', { state: { openAddModal: true } })
    },
    { 
      title: 'Pricing Tool', 
      icon: Calculator, 
      color: 'bg-purple-100 text-purple-600',
      onClick: () => navigate('/tools/pricing')
    },
    { 
      title: 'AI Tools', 
      icon: Sparkles, 
      color: 'bg-yellow-100 text-yellow-600',
      onClick: () => navigate('/tools/ai')
    },
  ];

  const suppliersByCountry = [
    { country: 'Brazil', count: 12 },
    { country: 'USA', count: 8 },
    { country: 'China', count: 15 },
    { country: 'Paraguay', count: 5 },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className="p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="font-medium">{action.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suppliers by Country Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-6">Suppliers by Country</h2>
          <BarChart data={suppliersByCountry} />
        </div>

        {/* Currency Exchange Rates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-6">Currency Exchange Rates</h2>
          <CurrencyWidget />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <div className="flex space-x-4">
            <Link
              to="/products"
              className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            >
              View Products
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              to="/suppliers"
              className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            >
              View Suppliers
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <RecentActivities />
      </div>
    </div>
  );
};

export default DashboardPage;