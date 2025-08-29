import PaginatedTable from '../../../../components/tables/PaginatedTable';
import StatCard from '../../../../components/ui/StatCard';

const DeviceHistory = () => {
  // Mock data
  const deviceHistoryData = {
    overview: [
      { 
        title: 'Total Actions', 
        value: 12500, 
        change: '+5%', 
        icon: 'history',
        description: 'All device actions'
      },
      { 
        title: 'Successful Actions', 
        value: 11250, 
        change: '+4%', 
        icon: 'check',
        description: 'Completed successfully'
      },
      { 
        title: 'Failed Actions', 
        value: 1250, 
        change: '-2%', 
        icon: 'x',
        description: 'Did not complete'
      },
      { 
        title: 'Active Users', 
        value: 45, 
        change: '+3', 
        icon: 'users',
        description: 'Currently active'
      }
    ],
    tableData: [
      { action: 'Restart', performedBy: 'User 1', deviceId: 'DEV001', result: 'Success', datePerformed: '2023-08-24 10:30:00', dateCompleted: '2023-08-24 10:32:15' },
      { action: 'Update', performedBy: 'User 2', deviceId: 'DEV002', result: 'Failed', datePerformed: '2023-08-24 11:15:00', dateCompleted: '2023-08-24 11:20:30' },
      { action: 'Configuration', performedBy: 'User 3', deviceId: 'DEV003', result: 'Success', datePerformed: '2023-08-24 12:45:00', dateCompleted: '2023-08-24 12:47:20' },
      { action: 'Reset', performedBy: 'User 1', deviceId: 'DEV004', result: 'Success', datePerformed: '2023-08-24 13:20:00', dateCompleted: '2023-08-24 13:25:45' },
      { action: 'Diagnostic', performedBy: 'User 4', deviceId: 'DEV005', result: 'Success', datePerformed: '2023-08-24 14:10:00', dateCompleted: '2023-08-24 14:15:30' },
      { action: 'Update', performedBy: 'User 2', deviceId: 'DEV006', result: 'Success', datePerformed: '2023-08-24 15:30:00', dateCompleted: '2023-08-24 15:40:15' },
      { action: 'Restart', performedBy: 'User 3', deviceId: 'DEV007', result: 'Failed', datePerformed: '2023-08-24 16:45:00', dateCompleted: '2023-08-24 16:50:00' },
      { action: 'Configuration', performedBy: 'User 1', deviceId: 'DEV008', result: 'Success', datePerformed: '2023-08-24 17:20:00', dateCompleted: '2023-08-24 17:25:30' },
      { action: 'Reset', performedBy: 'User 5', deviceId: 'DEV009', result: 'Success', datePerformed: '2023-08-24 18:15:00', dateCompleted: '2023-08-24 18:20:45' },
      { action: 'Diagnostic', performedBy: 'User 4', deviceId: 'DEV010', result: 'Success', datePerformed: '2023-08-24 19:30:00', dateCompleted: '2023-08-24 19:35:15' },
    ]
  };

  const tableColumns = [
    { key: 'action', label: 'Action' },
    { key: 'performedBy', label: 'Performed By' },
    { key: 'deviceId', label: 'Device ID' },
    { key: 'result', label: 'Result' },
    { key: 'datePerformed', label: 'Date Performed' },
    { key: 'dateCompleted', label: 'Date Completed' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Device History</h1>
        <p className="mt-2 text-gray-600">Device action history and performance metrics</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {deviceHistoryData.overview.map((stat, index) => (
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
      
      {/* Device History Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Device Action History</h2>
        <PaginatedTable 
          columns={tableColumns} 
          data={deviceHistoryData.tableData} 
          filename="device_history"
        />
      </div>
    </div>
  );
};

export default DeviceHistory;