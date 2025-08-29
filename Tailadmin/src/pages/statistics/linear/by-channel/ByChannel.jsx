import { useState } from 'react';
import PaginatedTable from '../../../../components/tables/PaginatedTable';
import BarChartComponent from '../../../../components/charts/BarChartComponent';
import LineChartComponent from '../../../../components/charts/LineChartComponent';
import ComparisonChart from '../../../../components/charts/ComparisonChart';
import Select from '../../../../components/ui/Select';
import StatCard from '../../../../components/ui/StatCard';

const ByChannel = () => {
  // Mock data
  const channelData = {
    overview: [
      { 
        title: 'Total Viewing Set-top Boxes', 
        value: 1250, 
        change: '+12%', 
        icon: 'tv',
        description: 'Active devices'
      },
      { 
        title: 'Total Viewing Time', 
        value: '45,230', 
        change: '+8%', 
        icon: 'clock',
        description: 'Hours watched'
      },
      { 
        title: 'Average Rating', 
        value: 7.8, 
        change: '+0.5', 
        icon: 'star',
        description: 'Out of 10'
      },
      { 
        title: 'Peak Viewers', 
        value: 892, 
        change: '+15%', 
        icon: 'users',
        description: 'Simultaneous viewers'
      }
    ],
    tableData: [
      { channelName: 'Channel 1', viewingTime: '5,230 hours', rating: 8.5, tvr: 12.3, shares: 15.2, hits: 12500 },
      { channelName: 'Channel 2', viewingTime: '4,850 hours', rating: 8.2, tvr: 11.8, shares: 14.5, hits: 11800 },
      { channelName: 'Channel 3', viewingTime: '4,200 hours', rating: 7.9, tvr: 10.5, shares: 13.8, hits: 10500 },
      { channelName: 'Channel 4', viewingTime: '3,900 hours', rating: 7.7, tvr: 9.8, shares: 12.9, hits: 9800 },
      { channelName: 'Channel 5', viewingTime: '3,500 hours', rating: 7.5, tvr: 9.2, shares: 12.1, hits: 8900 },
      { channelName: 'Channel 6', viewingTime: '3,200 hours', rating: 7.3, tvr: 8.7, shares: 11.5, hits: 8200 },
      { channelName: 'Channel 7', viewingTime: '2,900 hours', rating: 7.1, tvr: 8.2, shares: 10.9, hits: 7500 },
      { channelName: 'Channel 8', viewingTime: '2,700 hours', rating: 6.9, tvr: 7.8, shares: 10.3, hits: 6900 },
      { channelName: 'Channel 9', viewingTime: '2,500 hours', rating: 6.7, tvr: 7.4, shares: 9.8, hits: 6400 },
      { channelName: 'Channel 10', viewingTime: '2,300 hours', rating: 6.5, tvr: 7.0, shares: 9.3, hits: 5900 },
    ],
    topChannels: [
      { name: 'Channel 1', rating: 8.5 },
      { name: 'Channel 2', rating: 8.2 },
      { name: 'Channel 3', rating: 7.9 },
      { name: 'Channel 4', rating: 7.7 },
      { name: 'Channel 5', rating: 7.5 },
      { name: 'Channel 6', rating: 7.3 },
      { name: 'Channel 7', rating: 7.1 },
      { name: 'Channel 8', rating: 6.9 },
      { name: 'Channel 9', rating: 6.7 },
      { name: 'Channel 10', rating: 6.5 },
    ],
    timelineData: {
      'Channel 1': [
        { time: '00:00', rating: 7.5 },
        { time: '04:00', rating: 7.8 },
        { time: '08:00', rating: 8.2 },
        { time: '12:00', rating: 8.5 },
        { time: '16:00', rating: 8.7 },
        { time: '20:00', rating: 8.9 },
        { time: '24:00', rating: 8.5 },
      ],
      'Channel 2': [
        { time: '00:00', rating: 7.2 },
        { time: '04:00', rating: 7.5 },
        { time: '08:00', rating: 7.9 },
        { time: '12:00', rating: 8.2 },
        { time: '16:00', rating: 8.4 },
        { time: '20:00', rating: 8.6 },
        { time: '24:00', rating: 8.2 },
      ],
    },
    comparisonData: {
      'Channel 1 vs Channel 2': [
        { time: '00:00', 'Channel 1': 7.5, 'Channel 2': 7.2 },
        { time: '04:00', 'Channel 1': 7.8, 'Channel 2': 7.5 },
        { time: '08:00', 'Channel 1': 8.2, 'Channel 2': 7.9 },
        { time: '12:00', 'Channel 1': 8.5, 'Channel 2': 8.2 },
        { time: '16:00', 'Channel 1': 8.7, 'Channel 2': 8.4 },
        { time: '20:00', 'Channel 1': 8.9, 'Channel 2': 8.6 },
        { time: '24:00', 'Channel 1': 8.5, 'Channel 2': 8.2 },
      ]
    }
  };

  const [selectedChannel, setSelectedChannel] = useState('Channel 1');
  const channelOptions = [
    { value: 'Channel 1', label: 'Channel 1' },
    { value: 'Channel 2', label: 'Channel 2' },
    { value: 'Channel 3', label: 'Channel 3' },
    { value: 'Channel 4', label: 'Channel 4' },
    { value: 'Channel 5', label: 'Channel 5' },
  ];

  const tableColumns = [
    { key: 'channelName', label: 'Channel Name' },
    { key: 'viewingTime', label: 'Viewing Time' },
    { key: 'rating', label: 'Rating' },
    { key: 'tvr', label: 'TVR' },
    { key: 'shares', label: 'Shares' },
    { key: 'hits', label: 'Hits' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">By Channel</h1>
        <p className="mt-2 text-gray-600">Channel performance analytics and insights</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {channelData.overview.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>
      
      {/* Channel Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Channel Statistics</h2>
        <PaginatedTable 
          columns={tableColumns} 
          data={channelData.tableData} 
          filename="channel_statistics"
        />
      </div>
      
      {/* Top Channels Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 10 Channels by Rating</h2>
        <BarChartComponent 
          data={channelData.topChannels} 
          dataKey="rating" 
          xAxisKey="name" 
          title="Top Channels by Rating" 
        />
      </div>
      
      {/* Channel Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Channel Timeline</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Channel</label>
          <Select
            options={channelOptions}
            value={selectedChannel}
            onChange={setSelectedChannel}
            placeholder="Select a channel"
          />
        </div>
        <LineChartComponent 
          data={channelData.timelineData[selectedChannel]} 
          dataKey="rating" 
          xAxisKey="time" 
          title={`${selectedChannel} Rating Timeline`} 
        />
      </div>
      
      {/* Channel Comparison */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Channel Comparison</h2>
        <ComparisonChart 
          data={channelData.comparisonData}
          items={channelOptions}
          title="Channel Rating Comparison"
          dataKey1="Channel 1"
          dataKey2="Channel 2"
        />
      </div>
    </div>
  );
};

export default ByChannel;