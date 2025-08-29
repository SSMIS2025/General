// src/components/charts/ComparisonChart.jsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Select from '../ui/Select';

const ComparisonChart = ({ data, items, title, dataKey1, dataKey2 }) => {
  const [item1, setItem1] = useState(items[0]?.value || '');
  const [item2, setItem2] = useState(items[1]?.value || '');

  // Prepare chart data
  const chartData = data[`${item1} vs ${item2}`] || [];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select First Item</label>
          <Select
            options={items}
            value={item1}
            onChange={setItem1}
            placeholder="Select first item"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Second Item</label>
          <Select
            options={items}
            value={item2}
            onChange={setItem2}
            placeholder="Select second item"
          />
        </div>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey1} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey={dataKey2} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;