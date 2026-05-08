import { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Appointment {
  id: number;
  time: string;
  petName: string;
  owner: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  duration: string;
}

export function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 7));
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const appointments: Appointment[] = [
    {
      id: 1,
      time: '09:00',
      petName: 'Bobik',
      owner: 'Aliyev Sardor',
      type: 'Qabul',
      status: 'completed',
      duration: '30 min',
    },
    {
      id: 2,
      time: '10:00',
      petName: 'Murka',
      owner: 'Karimova Dilnoza',
      type: "Ko'rik",
      status: 'completed',
      duration: '45 min',
    },
    {
      id: 3,
      time: '11:00',
      petName: 'Rex',
      owner: 'Toshmatov Javohir',
      type: 'Operatsiya',
      status: 'in-progress',
      duration: '2 soat',
    },
    {
      id: 4,
      time: '14:00',
      petName: 'Fluffy',
      owner: 'Nazarova Malika',
      type: 'Analiz',
      status: 'scheduled',
      duration: '30 min',
    },
    {
      id: 5,
      time: '15:30',
      petName: 'Lucky',
      owner: 'Rustamov Otabek',
      type: 'Qabul',
      status: 'scheduled',
      duration: '30 min',
    },
    {
      id: 6,
      time: '16:30',
      petName: 'Barsik',
      owner: 'Yusupova Feruza',
      type: "Ko'rik",
      status: 'scheduled',
      duration: '45 min',
    },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'scheduled':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Bajarildi';
      case 'in-progress':
        return 'Jarayonda';
      case 'scheduled':
        return 'Rejalashtirilgan';
      case 'cancelled':
        return 'Bekor qilingan';
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Qabullar taqvimi</h1>
          <p className="text-gray-600">Kunlik qabullarni boshqarish va rejalash</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Yangi qabul qo'shish
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <div className="font-bold text-gray-800">May 2026</div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['D', 'S', 'C', 'P', 'J', 'S', 'Y'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(2026, 4, day))}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all ${
                    day === 7
                      ? 'bg-blue-600 text-white font-bold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="font-bold text-gray-800 mb-4">Bugungi statistika</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Jami qabullar</span>
                <span className="font-bold text-gray-800">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bajarildi</span>
                <span className="font-bold text-green-600">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Jarayonda</span>
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Kutilmoqda</span>
                <span className="font-bold text-gray-600">3</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{formatDate(selectedDate)}</h2>
                  <p className="text-sm text-gray-600">Payshanba</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'day'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Kun
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'week'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Hafta
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Timeline View */}
            <div className="space-y-2">
              {timeSlots.map((timeSlot, index) => {
                const appointment = appointments.find((apt) => apt.time === timeSlot);

                return (
                  <motion.div
                    key={timeSlot}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="w-20 flex items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="font-medium">{timeSlot}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      {appointment ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border-2 ${getStatusColor(
                            appointment.status
                          )} transition-all cursor-pointer`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-bold text-gray-800 mb-1">{appointment.petName}</div>
                              <div className="text-sm text-gray-600">{appointment.owner}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                                {getStatusLabel(appointment.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium text-gray-700">{appointment.type}</span>
                            <span className="text-gray-500">• {appointment.duration}</span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02, borderColor: '#3B82F6' }}
                          className="w-full h-16 border-2 border-dashed border-gray-200 rounded-lg hover:bg-blue-50 transition-all text-gray-400 hover:text-blue-600"
                        >
                          + Qabul qo'shish
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
