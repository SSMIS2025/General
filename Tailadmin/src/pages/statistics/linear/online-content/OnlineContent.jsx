import { useState } from 'react';
import PaginatedTable from '../../../../components/tables/PaginatedTable';
import BarChartComponent from '../../../../components/charts/BarChartComponent';
import LineChartComponent from '../../../../components/charts/LineChartComponent';
import ComparisonChart from '../../../../components/charts/ComparisonChart';
import Select from '../../../../components/ui/Select';
import StatCard from '../../../../components/ui/StatCard';

const OnlineContent = () => {
  // Mock data
  const contentData = {
    overview: [
      { 
        title: 'Total Content', 
        value: 1250, 
        change: '+15%', 
        icon: 'film',
        description: 'Available content items'
      },
      { 
        title: 'Total Watch Time', 
        value: '125,000', 
        change: '+10%', 
        icon: 'clock',
        description: 'Hours watched'
      },
      { 
        title: 'Total Views', 
        value: '2,500,000', 
        change: '+18%', 
        icon: 'eye',
        description: 'All time views'
      },
      { 
        title: 'Top Content', 
        value: 'Content 1', 
        change: '8.7', 
        icon: 'star',
        description: 'Highest rated'
      }
    ],
    tableData: [
      { contentTitle: 'Content 1', session: 'Season 1', episode: 'Episode 1', viewingTime: '3,500 hours', hits: 85000, rating: 8.7 },
      { contentTitle: 'Content 2', session: 'Season 1', episode: 'Episode 2', viewingTime: '3,200 hours', hits: 78000, rating: 8.5 },
      { contentTitle: 'Content 3', session: 'Season 2', episode: 'Episode 1', viewingTime: '2,900 hours', hits: 72000, rating: 8.3 },
      { contentTitle: 'Content 4', session: 'Season 2', episode: 'Episode 2', viewingTime: '2,700 hours', hits: 68000, rating: 8.1 },
      { contentTitle: 'Content 5', session: 'Season 3', episode: 'Episode 1', viewingTime: '2,500 hours', hits: 64000, rating: 7.9 },
      { contentTitle: 'Content 6', session: 'Season 3', episode: 'Episode 2', viewingTime: '2,300 hours', hits: 60000, rating: 7.7 },
      { contentTitle: 'Content 7', session: 'Season 4', episode: 'Episode 1', viewingTime: '2,100 hours', hits: 56000, rating: 7.5 },
      { contentTitle: 'Content 8', session: 'Season 4', episode: 'Episode 2', viewingTime: '1,900 hours', hits: 52000, rating: 7.3 },
      { contentTitle: 'Content 9', session: 'Season 5', episode: 'Episode 1', viewingTime: '1,700 hours', hits: 48000, rating: 7.1 },
      { contentTitle: 'Content 10', session: 'Season 5', episode: 'Episode 2', viewingTime: '1,500 hours', hits: 44000, rating: 6.9 },
    ],
    topContent: [
      { name: 'Content 1', rating: 8.7 },
      { name: 'Content 2', rating: 8.5 },
      { name: 'Content 3', rating: 8.3 },
      { name: 'Content 4', rating: 8.1 },
      { name: 'Content 5', rating: 7.9 },
      { name: 'Content 6', rating: 7.7 },
      { name: 'Content 7', rating: 7.5 },
      { name: 'Content 8', rating: 7.3 },
      { name: 'Content 9', rating: 7.1 },
      { name: 'Content 10', rating: 6.9 },
    ],
    timelineData: {
      'Content 1': [
        { time: '00:00', rating: 8.3 },
        { time: '04:00', rating: 8.5 },
        { time: '08:00', rating: 8.7 },
        { time: '12:00', rating: 8.9 },
        { time: '16:00', rating: 9.1 },
        { time: '20:00', rating: 9.3 },
        { time: '24:00', rating: 8.7 },
      ],
      'Content 2': [
        { time: '00:00', rating: 8.1 },
        { time: '04:00', rating: 8.3 },
        { time: '08:00', rating: 8.5 },
        { time: '12:00', rating: 8.7 },
        { time: '16:00', rating: 8.9 },
        { time: '20:00', rating: 9.1 },
        { time: '24:00', rating: 8.5 },
      ],
    },
    comparisonData: {
      'Content 1 vs Content 2': [
        { time: '00:00', 'Content 1': 8.3, 'Content 2': 8.1 },
        { time: '04:00', 'Content 1': 8.5, 'Content 2': 8.3 },
        { time: '08:00', 'Content 1': 8.7, 'Content 2': 8.5 },
        { time: '12:00', 'Content 1': 8.9, 'Content 2': 8.7 },
        { time: '16:00', 'Content 1': 9.1, 'Content 2': 8.9 },
        { time: '20:00', 'Content 1': 9.3, 'Content 2': 9.1 },
        { time: '24:00', 'Content 1': 8.7, 'Content 2': 8.5 },
      ]
    }
  };

  const [selectedContent, setSelectedContent] = useState('Content 1');
  const contentOptions = [
    { value: 'Content 1', label: 'Content 1' },
    { value: 'Content 2', label: 'Content 2' },
    { value: 'Content 3', label: 'Content 3' },
    { value: 'Content 4', label: 'Content 4' },
    { value: 'Content 5', label: 'Content 5' },
  ];

  const tableColumns = [
    { key: 'contentTitle', label: 'Content Title' },
    { key: 'session', label: 'Session' },
    { key: 'episode', label: 'Episode' },
    { key: 'viewingTime', label: 'Viewing Time' },
    { key: 'hits', label: 'Hits' },
    { key: 'rating', label: 'Rating' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Online Content</h1>
        <p className="mt-2 text-gray-600">Online content performance analytics and insights</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {contentData.overview.map((stat, index) => (
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
      
      {/* Content Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Content Statistics</h2>
        <PaginatedTable 
          columns={tableColumns} 
          data={contentData.tableData} 
          filename="content_statistics"
        />
      </div>
      
      {/* Top Content Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 10 Online Content by Rating</h2>
        <BarChartComponent 
          data={contentData.topContent} 
          dataKey="rating" 
          xAxisKey="name" 
          title="Top Content by Rating" 
        />
      </div>
      
      {/* Content Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Content Timeline</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Content</label>
          <Select
            options={contentOptions}
            value={selectedContent}
            onChange={setSelectedContent}
            placeholder="Select content"
          />
        </div>
        <LineChartComponent 
          data={contentData.timelineData[selectedContent]} 
          dataKey="rating" 
          xAxisKey="time" 
          title={`${selectedContent} Rating Timeline`} 
        />
      </div>
      
      {/* Content Comparison */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Content Comparison</h2>
        <ComparisonChart 
          data={contentData.comparisonData}
          items={contentOptions}
          title="Content Rating Comparison"
          dataKey1="Content 1"
          dataKey2="Content 2"
        />
      </div>
    </div>
  );
};

export default OnlineContent;