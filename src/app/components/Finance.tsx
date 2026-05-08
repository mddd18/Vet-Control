import { DollarSign, TrendingUp, TrendingDown, Calendar, Receipt, CreditCard } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export function Finance() {
  const monthlyData = [
    { month: 'Yan', revenue: 38, expenses: 15 },
    { month: 'Fev', revenue: 42, expenses: 18 },
    { month: 'Mar', revenue: 39, expenses: 16 },
    { month: 'Apr', revenue: 45, expenses: 19 },
    { month: 'May', revenue: 48, expenses: 20 },
  ];

  const serviceData = [
    { service: 'Qabul', count: 45, revenue: 13.5 },
    { service: "Ko'rik", count: 38, revenue: 11.4 },
    { service: 'Operatsiya', count: 12, revenue: 18.0 },
    { service: 'Analiz', count: 28, revenue: 5.6 },
    { service: 'Davolash', count: 22, revenue: 8.8 },
  ];

  const recentTransactions = [
    { id: 1, date: '2026-05-07 14:30', patient: 'Bobik', owner: 'Aliyev S.', service: 'Qabul', amount: 300000, method: 'Naqd' },
    { id: 2, date: '2026-05-07 11:15', patient: 'Murka', owner: 'Karimova D.', service: "Ko'rik", amount: 250000, method: 'Karta' },
    { id: 3, date: '2026-05-07 09:00', patient: 'Rex', owner: 'Toshmatov J.', service: 'Operatsiya', amount: 1500000, method: 'Karta' },
    { id: 4, date: '2026-05-06 16:30', patient: 'Fluffy', owner: 'Nazarova M.', service: 'Analiz', amount: 200000, method: 'Naqd' },
    { id: 5, date: '2026-05-06 14:00', patient: 'Lucky', owner: 'Rustamov O.', service: 'Qabul', amount: 300000, method: 'Karta' },
  ];

  const stats = [
    {
      label: 'Oylik daromad',
      value: '48.2M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      label: 'Oylik xarajat',
      value: '20.1M',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingDown,
      color: 'bg-red-500',
    },
    {
      label: 'Sof foyda',
      value: '28.1M',
      change: '+18.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      label: "Bugungi tushum",
      value: '2.55M',
      change: '8 ta xizmat',
      trend: 'neutral',
      icon: Receipt,
      color: 'bg-purple-500',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Moliya boshqaruvi</h1>
          <p className="text-gray-600">Daromad, xarajat va moliyaviy hisobotlar</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border-2 border-gray-300 px-6 py-3 rounded-lg hover:border-blue-500 transition-colors font-medium">
            <Calendar size={20} />
            May 2026
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Receipt size={20} />
            Hisobot yaratish
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp size={16} />
                    {stat.change}
                  </div>
                )}
                {stat.trend === 'down' && (
                  <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                    <TrendingDown size={16} />
                    {stat.change}
                  </div>
                )}
                {stat.trend === 'neutral' && (
                  <div className="text-gray-600 text-sm font-medium">{stat.change}</div>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daromad dinamikasi</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}M so'm`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} name="Daromad" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Xarajat" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Services Revenue */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Xizmatlar bo'yicha daromad</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}M so'm`} />
              <Bar dataKey="revenue" fill="#3B82F6" name="Daromad" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Services Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Xizmatlar statistikasi</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Xizmat turi</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Soni</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Daromad</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">O'rtacha narx</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{service.service}</td>
                  <td className="text-center py-3 px-4 text-gray-600">{service.count}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-800">{service.revenue}M so'm</td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {((service.revenue / service.count) * 1000000).toLocaleString()} so'm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">So'nggi tranzaksiyalar</h2>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Receipt className="text-blue-600" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{transaction.patient}</div>
                  <div className="text-sm text-gray-600">{transaction.owner}</div>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-1">{transaction.service}</div>
                <div className="flex items-center gap-2">
                  {transaction.method === 'Karta' ? (
                    <CreditCard size={16} className="text-blue-600" />
                  ) : (
                    <DollarSign size={16} className="text-green-600" />
                  )}
                  <span className="text-xs text-gray-600">{transaction.method}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{formatCurrency(transaction.amount)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
