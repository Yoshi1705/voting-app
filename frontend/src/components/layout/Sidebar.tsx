import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Vote, 
  Users, 
  BarChart3, 
  Settings, 
  UserPlus, 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { 
      to: '/dashboard', 
      icon: Home, 
      label: 'Dashboard', 
      roles: ['VOTER', 'CANDIDATE', 'ADMIN', 'COORDINATOR'] 
    },
    { 
      to: '/vote', 
      icon: Vote, 
      label: 'Vote', 
      roles: ['VOTER', 'CANDIDATE'] 
    },
    { 
      to: '/candidates', 
      icon: Users, 
      label: 'Candidates', 
      roles: ['VOTER', 'CANDIDATE', 'ADMIN', 'COORDINATOR'] 
    },
    { 
      to: '/results', 
      icon: BarChart3, 
      label: 'Results', 
      roles: ['ADMIN'] 
    },
    { 
      to: '/manage-candidates', 
      icon: UserPlus, 
      label: 'Manage Candidates', 
      roles: ['COORDINATOR'] 
    },
    { 
      to: '/election-control', 
      icon: Settings, 
      label: 'Election Control', 
      roles: ['ADMIN'] 
    },
  ];

  const visibleNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role as UserRole)
  );

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="bg-gray-50 w-64 min-h-screen border-r border-gray-200"
    >
      <div className="p-4">
        <nav className="space-y-2">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
