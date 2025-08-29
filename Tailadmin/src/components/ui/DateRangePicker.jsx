import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);
    setStartDate(newStartDate);
    onDateRangeChange(newStartDate, endDate);
  };
  
  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);
    setEndDate(newEndDate);
    onDateRangeChange(startDate, newEndDate);
  };
  
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <label htmlFor="start-date" className="mr-2 text-sm font-medium text-gray-700">From:</label>
        <div className="relative">
          <input
            type="date"
            id="start-date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={handleStartDateChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <label htmlFor="end-date" className="mr-2 text-sm font-medium text-gray-700">To:</label>
        <div className="relative">
          <input
            type="date"
            id="end-date"
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={handleEndDateChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;