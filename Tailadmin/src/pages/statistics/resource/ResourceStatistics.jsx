import { useState } from 'react';
import DateRangePicker from '../../../components/ui/DateRangePicker';
import ResourceTable from '../../../components/tables/ResourceTable';

const ResourceStatistics = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date('2024-08-18'),
    end: new Date('2024-08-24')
  });

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
  };

  // Mock data
  const resourceData = {
    categories: ['CPU Usage', 'Memory Usage', 'Network Traffic', 'Storage Used'],
    data: [
      { category: 'CPU Usage', '18Aug24': 45, '19Aug24': 52, '20Aug24': 48, '21Aug24': 55, '22Aug24': 60, '23Aug24': 58, '24Aug24': 62 },
      { category: 'Memory Usage', '18Aug24': 55, '19Aug24': 58, '20Aug24': 62, '21Aug24': 60, '22Aug24': 65, '23Aug24': 68, '24Aug24': 70 },
      { category: 'Network Traffic', '18Aug24': 25, '19Aug24': 30, '20Aug24': 28, '21Aug24': 35, '22Aug24': 40, '23Aug24': 38, '24Aug24': 42 },
      { category: 'Storage Used', '18Aug24': 65, '19Aug24': 66, '20Aug24': 67, '21Aug24': 68, '22Aug24': 69, '23Aug24': 70, '24Aug24': 71 }
    ]
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resource Statistics</h1>
      
      <div className="mb-6">
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>
      
      <ResourceTable data={resourceData} />
    </div>
  );
};

export default ResourceStatistics;