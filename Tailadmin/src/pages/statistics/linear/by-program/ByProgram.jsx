import { useState } from 'react';
import PaginatedTable from '../../../../components/tables/PaginatedTable';
import BarChartComponent from '../../../../components/charts/BarChartComponent';
import LineChartComponent from '../../../../components/charts/LineChartComponent';
import ComparisonChart from '../../../../components/charts/ComparisonChart';
import Select from '../../../../components/ui/Select';
import StatCard from '../../../../components/ui/StatCard';

const ByProgram = () => {
  // Mock data
  const programData = {
    overview: [
      { 
        title: 'Total Programs', 
        value: 350, 
        change: '+8%', 
        icon: 'document',
        description: 'Available programs'
      },
      { 
        title: 'Average Rating', 
        value: 7.5, 
        change: '+0.3', 
        icon: 'star',
        description: 'Out of 10'
      },
      { 
        title: 'Total Views', 
        value: '1,250,000', 
        change: '+12%', 
        icon: 'eye',
        description: 'All time views'
      },
      { 
        title: 'Top Program', 
        value: 'Program 1', 
        change: '8.2', 
        icon: 'trophy',
        description: 'Highest rated'
      }
    ],
    tableData: [
      { programTitle: 'Program 1', channelName: 'Channel 1', viewingTime: '2,300 hours', hits: 45000, rating: 8.2 },
      { programTitle: 'Program 2', channelName: 'Channel 2', viewingTime: '2,100 hours', hits: 42000, rating: 8.0 },
      { programTitle: 'Program 3', channelName: 'Channel 3', viewingTime: '1,900 hours', hits: 38000, rating: 7.8 },
      { programTitle: 'Program 4', channelName: 'Channel 4', viewingTime: '1,800 hours', hits: 36000, rating: 7.6 },
      { programTitle: 'Program 5', channelName: 'Channel 5', viewingTime: '1,700 hours', hits: 34000, rating: 7.4 },
      { programTitle: 'Program 6', channelName: 'Channel 1', viewingTime: '1,600 hours', hits: 32000, rating: 7.2 },
      { programTitle: 'Program 7', channelName: 'Channel 2', viewingTime: '1,500 hours', hits: 30000, rating: 7.0 },
      { programTitle: 'Program 8', channelName: 'Channel 3', viewingTime: '1,400 hours', hits: 28000, rating: 6.8 },
      { programTitle: 'Program 9', channelName: 'Channel 4', viewingTime: '1,300 hours', hits: 26000, rating: 6.6 },
      { programTitle: 'Program 10', channelName: 'Channel 5', viewingTime: '1,200 hours', hits: 24000, rating: 6.4 },
    ],
    topPrograms: [
      { name: 'Program 1', rating: 8.2 },
      { name: 'Program 2', rating: 8.0 },
      { name: 'Program 3', rating: 7.8 },
      { name: 'Program 4', rating: 7.6 },
      { name: 'Program 5', rating: 7.4 },
      { name: 'Program 6', rating: 7.2 },
      { name: 'Program 7', rating: 7.0 },
      { name: 'Program 8', rating: 6.8 },
      { name: 'Program 9', rating: 6.6 },
      { name: 'Program 10', rating: 6.4 },
    ],
    timelineData: {
      'Program 1': [
        { time: '00:00', rating: 7.8 },
        { time: '04:00', rating: 8.0 },
        { time: '08:00', rating: 8.2 },
        { time: '12:00', rating: 8.4 },
        { time: '16:00', rating: 8.6 },
        { time: '20:00', rating: 8.8 },
        { time: '24:00', rating: 8.2 },
      ],
      'Program 2': [
        { time: '00:00', rating: 7.5 },
        { time: '04:00', rating: 7.7 },
        { time: '08:00', rating: 7.9 },
        { time: '12:00', rating: 8.1 },
        { time: '16:00', rating: 8.3 },
        { time: '20:00', rating: 8.5 },
        { time: '24:00', rating: 8.0 },
      ],
    },
    comparisonData: {
      'Program 1 vs Program 2': [
        { time: '00:00', 'Program 1': 7.8, 'Program 2': 7.5 },
        { time: '04:00', 'Program 1': 8.0, 'Program 2': 7.7 },
        { time: '08:00', 'Program 1': 8.2, 'Program 2': 7.9 },
        { time: '12:00', 'Program 1': 8.4, 'Program 2': 8.1 },
        { time: '16:00', 'Program 1': 8.6, 'Program 2': 8.3 },
        { time: '20:00', 'Program 1': 8.8, 'Program 2': 8.5 },
        { time: '24:00', 'Program 1': 8.2, 'Program 2': 8.0 },
      ]
    }
  };

  const [selectedProgram, setSelectedProgram] = useState('Program 1');
  const programOptions = [
    { value: 'Program 1', label: 'Program 1' },
    { value: 'Program 2', label: 'Program 2' },
    { value: 'Program 3', label: 'Program 3' },
    { value: 'Program 4', label: 'Program 4' },
    { value: 'Program 5', label: 'Program 5' },
  ];

  const tableColumns = [
    { key: 'programTitle', label: 'Program Title' },
    { key: 'channelName', label: 'Channel Name' },
    { key: 'viewingTime', label: 'Viewing Time' },
    { key: 'hits', label: 'Hits' },
    { key: 'rating', label: 'Rating' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">By Program</h1>
        <p className="mt-2 text-gray-600">Program performance analytics and insights</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {programData.overview.map((stat, index) => (
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
      
      {/* Program Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Program Statistics</h2>
        <PaginatedTable 
          columns={tableColumns} 
          data={programData.tableData} 
          filename="program_statistics"
        />
      </div>
      
      {/* Top Programs Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 10 Programs by Rating</h2>
        <BarChartComponent 
          data={programData.topPrograms} 
          dataKey="rating" 
          xAxisKey="name" 
          title="Top Programs by Rating" 
        />
      </div>
      
      {/* Program Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Program Timeline</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Program</label>
          <Select
            options={programOptions}
            value={selectedProgram}
            onChange={setSelectedProgram}
            placeholder="Select a program"
          />
        </div>
        <LineChartComponent 
          data={programData.timelineData[selectedProgram]} 
          dataKey="rating" 
          xAxisKey="time" 
          title={`${selectedProgram} Rating Timeline`} 
        />
      </div>
      
      {/* Program Comparison */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Program Comparison</h2>
        <ComparisonChart 
          data={programData.comparisonData}
          items={programOptions}
          title="Program Rating Comparison"
          dataKey1="Program 1"
          dataKey2="Program 2"
        />
      </div>
    </div>
  );
};

export default ByProgram;