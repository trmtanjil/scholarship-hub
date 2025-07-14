import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import {
  Tooltip, ResponsiveContainer, 
  Legend, Cell, PieChart, Pie
} from 'recharts';
import { FiActivity, FiPieChart, FiBarChart2 } from 'react-icons/fi';

const AnalyticsChartpage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ['applicationStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/application-stats');
      return res.data;
    }
  });

  // Process data for charts
  const chartData = stats.map(stat => ({
    name: stat._id.charAt(0).toUpperCase() + stat._id.slice(1),
    value: stat.count,
    status: stat._id
  }));

  // Color mapping based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#FFBB28';
      case 'approved': return '#00C49F';
      case 'rejected': return '#FF8042';
      default: return '#8884d8';
    }
  };

  // Calculate total applications
  const totalApplications = stats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex items-center">
            <FiActivity className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-2xl font-bold">Application Analytics Dashboard</h2>
              <p className="text-blue-100">Visual insights into scholarship applications</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <FiBarChart2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
                    <p className="text-xl font-semibold text-gray-900">{totalApplications}</p>
                  </div>
                </div>
              </div>

              {chartData.map((item) => (
                <div 
                  key={item.status} 
                  className="rounded-lg p-4 border-l-4" 
                  style={{ 
                    backgroundColor: `${getStatusColor(item.status)}20`,
                    borderColor: getStatusColor(item.status)
                  }}
                >
                  <div className="flex items-center">
                    <div 
                      className="p-2 rounded-full mr-3" 
                      style={{ backgroundColor: `${getStatusColor(item.status)}20` }}
                    >
                      <FiPieChart 
                        className="h-5 w-5" 
                        style={{ color: getStatusColor(item.status) }} 
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
                      <p className="text-xl font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

      

            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                <FiPieChart className="mr-2 text-blue-900" />
                Status Distribution
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, ) => [
                        value, 
                        `${name}: ${((value / totalApplications) * 100).toFixed(2)}%`
                      ]}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend 
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChartpage;