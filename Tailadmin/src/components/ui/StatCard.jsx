// src/components/ui/StatCard.jsx
import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon, 
  WifiIcon, 
  ExclamationTriangleIcon, 
  NoSymbolIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  UsersIcon,
  TvIcon,
  ClockIcon,
  StarIcon,
  DocumentTextIcon,
  EyeIcon,
  TrophyIcon,
  FilmIcon,
  ClockIcon as HistoryIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'device':
      return <DevicePhoneMobileIcon className="h-6 w-6" />;
    case 'online':
      return <WifiIcon className="h-6 w-6" />;
    case 'never':
      return <ExclamationTriangleIcon className="h-6 w-6" />;
    case 'offline':
      return <NoSymbolIcon className="h-6 w-6" />;
    case 'unregistered':
      return <UserCircleIcon className="h-6 w-6" />;
    case 'models':
      return <Cog6ToothIcon className="h-6 w-6" />;
    case 'users':
      return <UsersIcon className="h-6 w-6" />;
    case 'tv':
      return <TvIcon className="h-6 w-6" />;
    case 'clock':
      return <ClockIcon className="h-6 w-6" />;
    case 'star':
      return <StarIcon className="h-6 w-6" />;
    case 'document':
      return <DocumentTextIcon className="h-6 w-6" />;
    case 'eye':
      return <EyeIcon className="h-6 w-6" />;
    case 'trophy':
      return <TrophyIcon className="h-6 w-6" />;
    case 'film':
      return <FilmIcon className="h-6 w-6" />;
    case 'history':
      return <HistoryIcon className="h-6 w-6" />;
    case 'check':
      return <CheckCircleIcon className="h-6 w-6" />;
    case 'x':
      return <XCircleIcon className="h-6 w-6" />;
    default:
      return <DevicePhoneMobileIcon className="h-6 w-6" />;
  }
};

const getColorClass = (iconName) => {
  switch (iconName) {
    case 'device':
      return 'bg-blue-100 text-blue-600';
    case 'online':
      return 'bg-green-100 text-green-600';
    case 'never':
      return 'bg-yellow-100 text-yellow-600';
    case 'offline':
      return 'bg-red-100 text-red-600';
    case 'unregistered':
      return 'bg-purple-100 text-purple-600';
    case 'models':
      return 'bg-indigo-100 text-indigo-600';
    case 'users':
      return 'bg-teal-100 text-teal-600';
    case 'tv':
      return 'bg-cyan-100 text-cyan-600';
    case 'clock':
      return 'bg-amber-100 text-amber-600';
    case 'star':
      return 'bg-yellow-100 text-yellow-600';
    case 'document':
      return 'bg-gray-100 text-gray-600';
    case 'eye':
      return 'bg-violet-100 text-violet-600';
    case 'trophy':
      return 'bg-orange-100 text-orange-600';
    case 'film':
      return 'bg-rose-100 text-rose-600';
    case 'history':
      return 'bg-blue-100 text-blue-600';
    case 'check':
      return 'bg-green-100 text-green-600';
    case 'x':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBg = isPositive ? 'bg-green-100' : 'bg-red-100';
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 p-3 rounded-lg ${getColorClass(icon)}`}>
          {getIcon(icon)}
        </div>
        <div className="ml-4 flex-1">
          <h2 className="text-sm font-medium text-gray-500">{title}</h2>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${changeBg} ${changeColor}`}>
              {change}
            </div>
          </div>
        </div>
      </div>
      
      {/* Real-time indicator */}
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-1"></div>
        <span>Live data</span>
      </div>
    </motion.div>
  );
};

export default StatCard;