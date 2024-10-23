import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Truck, 
  Settings,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Truck, label: 'Suppliers', path: '/suppliers' },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      submenu: [
        { icon: User, label: 'User Information', path: '/settings/profile' }
      ]
    },
  ];

  return (
    <aside className="bg-gray-800 text-white h-full flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 mt-8">
        {menuItems.map((item) => (
          <div key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 transition-colors ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              {!isCollapsed && (
                <span className="ml-4 transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </NavLink>
            {!isCollapsed && item.submenu && (
              <div className="ml-4 border-l border-gray-700">
                {item.submenu.map((subitem) => (
                  <NavLink
                    key={subitem.path}
                    to={subitem.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm transition-colors ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`
                    }
                  >
                    <subitem.icon size={16} />
                    <span className="ml-3">{subitem.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;