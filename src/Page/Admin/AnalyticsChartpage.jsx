import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import {
  Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie
} from 'recharts';
import { FiActivity, FiPieChart, FiBarChart2, FiDollarSign } from 'react-icons/fi';

const AnalyticsChartpage = () => {
  const axiosSecure = useAxiosSecure();

  // Application Stats
  const { data: stats = [], isLoading: isAppLoading } = useQuery({
    queryKey: ['applicationStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/application-stats');
      return res.data;
    }
  });

  // Payment Stats
  const { data: paymentStats = {}, isLoading: isPaymentLoading } = useQuery({
    queryKey: ['paymentStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/payment-stats');
      return res.data;
    }
  });

  // Process application stats for chart
  const chartData = stats.map(stat => ({
    name: stat._id.charAt(0).toUpperCase() + stat._id.slice(1),
    value: stat.count,
    status: stat._id
  }));

  // Color mapping based on application status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFBB28';
      case 'approved': return '#00C49F';
      case 'rejected': return '#FF8042';
      default: return '#8884d8';
    }
  };

  const totalApplications = stats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex items-center">
            <FiActivity className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-2xl font-bold">Application Analytics Dashboard</h2>
              <p className="text-blue-100">Visual insights into scholarship applications and payments</p>
            </div>
          </div>
        </div>

        {(isAppLoading || isPaymentLoading) ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6 space-y-8">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Applications */}
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

              {/* Total Revenue */}
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                    <FiDollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                    <p className="text-xl font-semibold text-gray-900">
                      ${parseFloat(paymentStats?.totalRevenue || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Payments */}
              <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                    <FiBarChart2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
                    <p className="text-xl font-semibold text-gray-900">
                      {paymentStats?.totalPayments || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Status Pie Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
                <FiPieChart className="mr-2 text-blue-900" />
                Application Status Distribution
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
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Method Pie Chart */}
            {paymentStats?.stats?.length > 0 && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center">
                  <FiPieChart className="mr-2 text-green-900" />
                  Payment Method Distribution
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentStats.stats}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="count"
                        nameKey="_id"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentStats.stats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#00C49F', '#FFBB28', '#8884d8', '#FF8042'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChartpage;
