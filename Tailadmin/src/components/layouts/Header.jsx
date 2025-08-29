// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Header = ({ isMinimized, toggleMinimize }) => {
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulate real-time notifications
  useEffect(() => {
    const notificationTimer = setInterval(() => {
      setNotifications(prev => prev + 1);
    }, 30000); // New notification every 30 seconds
    
    return () => clearInterval(notificationTimer);
  }, []);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {/* Minimize/Maximize button for desktop */}
          <button
            onClick={toggleMinimize}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors hidden lg:block"
          >
            {isMinimized ? (
              <ArrowsPointingOutIcon className="h-6 w-6" />
            ) : (
              <ArrowsPointingInIcon className="h-6 w-6" />
            )}
          </button>
          
          <div className="ml-4 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search devices, users, or data..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-sm text-gray-500">
            <span>{currentTime.toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{formatTime(currentTime)}</span>
          </div>
          
          <div className="relative">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative">
              <BellIcon className="h-6 w-6" />
              {notifications > 0 && (
                <motion.span 
                  className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {notifications}
                </motion.span>
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              U
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Admin User</p>
              <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Administrator</p>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;