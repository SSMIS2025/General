// src/pages/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../../components/ui/StatCard';
import { 
  DevicePhoneMobileIcon, 
  WifiIcon, 
  ExclamationTriangleIcon, 
  NoSymbolIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Devices', value: 1250, change: '+12%', icon: 'device' },
    { title: 'Online Devices', value: 980, change: '+5%', icon: 'online' },
    { title: 'Never Connected', value: 120, change: '-3%', icon: 'never' },
    { title: 'Offline Devices', value: 150, change: '-2%', icon: 'offline' },
    { title: 'Unregistered', value: 45, change: '-8%', icon: 'unregistered' },
    { title: 'Models', value: 8, change: '0%', icon: 'models' },
    { title: 'Users', value: 24, change: '+4%', icon: 'users' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => {
        return prevStats.map(stat => {
          // Randomly update some values
          if (Math.random() > 0.7) {
            const changeDirection = Math.random() > 0.5 ? 1 : -1;
            const changeAmount = Math.floor(Math.random() * 5) + 1;
            const newValue = Math.max(0, stat.value + (changeDirection * changeAmount));
            const changePercent = ((newValue - stat.value) / stat.value * 100).toFixed(1);
            const changeSign = changePercent >= 0 ? '+' : '';
            
            return {
              ...stat,
              value: newValue,
              change: `${changeSign}${changePercent}%`
            };
          }
          return stat;
        });
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to Suresoft Remote Management System</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            <div className="flex items-center text-sm text-green-600">
              <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              <span>Operational</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">CPU Usage</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Memory Usage</span>
                <span className="font-medium">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Storage Usage</span>
                <span className="font-medium">38%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Network Traffic</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Recent Activity Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 rounded-full bg-blue-100">
                <DevicePhoneMobileIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Device DEV001 restarted</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 rounded-full bg-green-100">
                <WifiIcon className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">12 devices came online</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Alert: High CPU usage on DEV045</p>
                <p className="text-xs text-gray-500">32 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 rounded-full bg-purple-100">
                <UsersIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New user registered: John Doe</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;