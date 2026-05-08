import { Users, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const stats = [
    { label: "Bugungi qabullar", labelEn: "Today's Appointments", value: '12', icon: Calendar, color: 'bg-blue-500' },
    { label: "Jami bemorlar", labelEn: "Total Patients", value: '248', icon: Users, color: 'bg-green-500' },
    { label: "Oylik daromad", labelEn: "Monthly Revenue", value: '45.2M', unit: "so'm", icon: DollarSign, color: 'bg-purple-500' },
    { label: "Kutilayotgan qabullar", labelEn: "Pending Appointments", value: '18', icon: AlertCircle, color: 'bg-orange-500' },
  ];

  const recentAppointments = [
    { id: 1, petName: 'Bobik', owner: 'Aliyev Sardor', type: 'Qabul', time: '09:00', status: 'completed' },
    { id: 2, petName: 'Murka', owner: 'Karimova Dilnoza', type: "Ko'rik", time: '10:30', status: 'completed' },
    { id: 3, petName: 'Rex', owner: 'Toshmatov Javohir', type: 'Operatsiya', time: '11:00', status: 'in-progress' },
    { id: 4, petName: 'Fluffy', owner: 'Nazarova Malika', type: 'Analiz', time: '14:00', status: 'upcoming' },
    { id: 5, petName: 'Lucky', owner: 'Rustamov Otabek', type: 'Qabul', time: '15:30', status: 'upcoming' },
  ];

  const upcomingAppointments = [
    { pet: 'Bobik', owner: 'Aliyev S.', service: 'Qabul', dueDate: '2026-05-10', daysLeft: 3 },
    { pet: 'Murka', owner: 'Karimova D.', service: "Ko'rik", dueDate: '2026-05-12', daysLeft: 5 },
    { pet: 'Rex', owner: 'Toshmatov J.', service: "Davolash", dueDate: '2026-05-15', daysLeft: 8 },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Klinikaning umumiy ko'rinishi va statistikasi</p>
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
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value} {stat.unit || ''}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bugungi qabullar</h2>
          <div className="space-y-3">
            {recentAppointments.map((apt, idx) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{apt.petName}</div>
                  <div className="text-sm text-gray-600">{apt.owner}</div>
                  <div className="text-xs text-gray-500">{apt.type}</div>
                </div>
                <div className="text-right mr-4">
                  <div className="font-medium text-gray-700">{apt.time}</div>
                </div>
                <div>
                  {apt.status === 'completed' && (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                      <CheckCircle size={14} />
                      Bajarildi
                    </div>
                  )}
                  {apt.status === 'in-progress' && (
                    <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-2 h-2 bg-blue-600 rounded-full"
                      />
                      Jarayonda
                    </div>
                  )}
                  {apt.status === 'upcoming' && (
                    <div className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                      Kutilmoqda
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Yaqinlashib kelayotgan qabullar</h2>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-800">{apt.pet}</div>
                  <div className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-medium">
                    {apt.daysLeft} kun qoldi
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">{apt.owner}</div>
                <div className="text-sm text-gray-700 font-medium">{apt.service}</div>
                <div className="text-xs text-gray-500 mt-2">Sana: {apt.dueDate}</div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Eslatmalarni yuborish
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
