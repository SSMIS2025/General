// src/components/layout/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  ArrowsPointingOutIcon,
  FilmIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, isMinimized }) => {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(true);
  const [isLinearOpen, setIsLinearOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: HomeIcon,
      color: 'bg-blue-500'
    },
    { 
      name: 'Statistics', 
      icon: ChartBarIcon,
      color: 'bg-purple-500',
      subItems: [
        { 
          name: 'Resource Statistics', 
          path: '/statistics/resource', 
          icon: CpuChipIcon,
          color: 'bg-green-500'
        },
        { 
          name: 'Linear Statistics', 
          icon: ArrowsPointingOutIcon,
          color: 'bg-yellow-500',
          subItems: [
            { name: 'By Channel', path: '/statistics/linear/by-channel', icon: ArrowsPointingOutIcon, color: 'bg-red-500' },
            { name: 'By Program', path: '/statistics/linear/by-program', icon: FilmIcon, color: 'bg-indigo-500' },
            { name: 'Online Content', path: '/statistics/linear/online-content', icon: FilmIcon, color: 'bg-pink-500' },
            { name: 'Device History', path: '/statistics/linear/device-history', icon: ClockIcon, color: 'bg-teal-500' },
          ]
        }
      ]
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Cog6ToothIcon,
      color: 'bg-gray-500'
    }
  ];
  
  const sidebarVariants = {
    open: { 
      width: isMinimized && !isHovered ? '4rem' : '16rem', 
      transition: { type: 'spring', stiffness: 300, damping: 30 } 
    },
    closed: { 
      width: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 30 } 
    }
  };
  
  // Determine if sidebar should be shown as expanded or minimized
  const isExpanded = isOpen && (!isMinimized || isHovered);
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="absolute inset-y-0 left-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl overflow-hidden"
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      onMouseEnter={() => isMinimized && setIsHovered(true)}
      onMouseLeave={() => isMinimized && setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo section - positioned at the top */}
        <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} p-4 border-b border-gray-700`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <DevicePhoneMobileIcon className="h-5 w-5 text-white" />
            </div>
            {isExpanded && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">SRMS</h1>
            )}
          </div>
        </div>
        
        {/* Navigation section with custom scrollbar */}
        <nav className="mt-6 px-2 flex-1 overflow-y-auto custom-scrollbar">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-1">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => item.name === 'Statistics' ? setIsStatisticsOpen(!isStatisticsOpen) : setIsLinearOpen(!isLinearOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${item.color} mr-3 flex-shrink-0`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        {isExpanded && <span>{item.name}</span>}
                      </div>
                      {isExpanded && (item.name === 'Statistics' ? (
                        isStatisticsOpen ? 
                          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" /> : 
                          <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      ) : (
                        isLinearOpen ? 
                          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" /> : 
                          <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      ))}
                    </button>
                    
                    <AnimatePresence>
                      {(item.name === 'Statistics' ? isStatisticsOpen : isLinearOpen) && isExpanded && (
                        <motion.ul 
                          className="pl-8 mt-1 space-y-1"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="mb-1">
                              {subItem.subItems ? (
                                <div>
                                  <button
                                    onClick={() => setIsLinearOpen(!isLinearOpen)}
                                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors group"
                                  >
                                    <div className="flex items-center">
                                      <div className={`p-2 rounded-lg ${subItem.color} mr-3 flex-shrink-0`}>
                                        <subItem.icon className="h-5 w-5 text-white" />
                                      </div>
                                      <span>{subItem.name}</span>
                                    </div>
                                    {isLinearOpen ? 
                                      <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" /> : 
                                      <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                                    }
                                  </button>
                                  
                                  <AnimatePresence>
                                    {isLinearOpen && (
                                      <motion.ul 
                                        className="pl-8 mt-1 space-y-1"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {subItem.subItems.map((nestedItem, nestedIndex) => (
                                          <li key={nestedIndex} className="mb-1">
                                            <NavLink
                                              to={nestedItem.path}
                                              className={({ isActive }) =>
                                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                                  isActive
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                }`
                                              }
                                            >
                                              <div className={`p-2 rounded-lg ${nestedItem.color} mr-3 flex-shrink-0`}>
                                                <nestedItem.icon className="h-5 w-5 text-white" />
                                              </div>
                                              <span>{nestedItem.name}</span>
                                            </NavLink>
                                          </li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                      isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                  }
                                >
                                  <div className={`p-2 rounded-lg ${subItem.color} mr-3 flex-shrink-0`}>
                                    <subItem.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <span>{subItem.name}</span>
                                </NavLink>
                              )}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    <div className={`p-2 rounded-lg ${item.color} mr-3 flex-shrink-0`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    {isExpanded && <span>{item.name}</span>}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom section - only show when expanded */}
        {isExpanded && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BellIcon className="h-5 w-5 text-gray-400" />
                </div>
                <button className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors text-left">
                  Notifications
                </button>
              </div>
            </div>
            
            <div className="mt-3 flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@suresoft.com</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Minimized bottom section */}
        {!isExpanded && (
          <div className="p-4 border-t border-gray-700 flex flex-col items-center space-y-4">
            <div className="p-2 rounded-lg bg-gray-800 text-gray-400">
              <BellIcon className="h-5 w-5" />
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <UserCircleIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;