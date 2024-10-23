import React from 'react';

interface BarChartProps {
  data: Array<{
    country: string;
    count: number;
  }>;
}

export const BarChart = ({ data }: BarChartProps) => {
  const maxValue = Math.max(...data.map(item => item.count));
  
  return (
    <div className="h-64 flex items-end space-x-8">
      {data.map((item) => (
        <div
          key={item.country}
          className="flex-1 flex flex-col items-center"
        >
          <div
            className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 ease-in-out hover:bg-blue-600"
            style={{
              height: `${(item.count / maxValue) * 200}px`,
            }}
          />
          <div className="mt-2 text-sm text-gray-600">{item.country}</div>
          <div className="text-sm font-semibold">{item.count}</div>
        </div>
      ))}
    </div>
  );
};