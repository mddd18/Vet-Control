import { useState } from 'react';
import { Bell, Send, MessageSquare, CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface Notification {
  id: number;
  type: 'appointment' | 'checkup' | 'reminder';
  petName: string;
  owner: string;
  phone: string;
  message: string;
  dueDate: string;
  status: 'pending' | 'sent' | 'failed';
  sentDate?: string;
  channel: 'sms' | 'telegram' | 'both';
}

export function Notifications() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'sent'>('all');

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'appointment',
      petName: 'Bobik',
      owner: 'Aliyev Sardor',
      phone: '+998 90 123 45 67',
      message: 'Hurmatli Aliyev Sardor! Sizning itingiz Bobik uchun qabul vaqti yaqinlashdi (10-May). Iltimos, klinikaga tashrif buyuring.',
      dueDate: '2026-05-10',
      status: 'pending',
      channel: 'both',
    },
    {
      id: 2,
      type: 'appointment',
      petName: 'Murka',
      owner: 'Karimova Dilnoza',
      phone: '+998 91 234 56 78',
      message: 'Hurmatli Karimova Dilnoza! Sizning mushukingiz Murka uchun qabul vaqti yaqinlashdi (12-May). Iltimos, klinikaga tashrif buyuring.',
      dueDate: '2026-05-12',
      status: 'pending',
      channel: 'telegram',
    },
    {
      id: 3,
      type: 'checkup',
      petName: 'Rex',
      owner: 'Toshmatov Javohir',
      phone: '+998 93 345 67 89',
      message: "Hurmatli Toshmatov Javohir! Sizning itingiz Rex uchun operatsiyadan keyingi ko'rik vaqti keldi (15-May). Iltimos, qabulga yoziling.",
      dueDate: '2026-05-15',
      status: 'sent',
      sentDate: '2026-05-05',
      channel: 'sms',
    },
    {
      id: 4,
      type: 'appointment',
      petName: 'Fluffy',
      owner: 'Nazarova Malika',
      phone: '+998 94 456 78 90',
      message: "Hurmatli Nazarova Malika! Sizga ertaga (08-May) soat 10:00 da qabul tayinlangan. Klinika manzili: Toshkent sh., Amir Temur ko'chasi 15.",
      dueDate: '2026-05-08',
      status: 'sent',
      sentDate: '2026-05-07',
      channel: 'both',
    },
    {
      id: 5,
      type: 'reminder',
      petName: 'Lucky',
      owner: 'Rustamov Otabek',
      phone: '+998 95 567 89 01',
      message: 'Hurmatli Rustamov Otabek! Bu sizga eslаtma: itingiz Lucky uchun qon analizi natijаlari tayyor. Ularni klinikadan olishingiz mumkin.',
      dueDate: '2026-05-07',
      status: 'sent',
      sentDate: '2026-05-07',
      channel: 'telegram',
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedFilter === 'all') return true;
    return notif.status === selectedFilter;
  });

  const stats = {
    total: notifications.length,
    pending: notifications.filter((n) => n.status === 'pending').length,
    sent: notifications.filter((n) => n.status === 'sent').length,
    failed: notifications.filter((n) => n.status === 'failed').length,
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      appointment: 'Qabul',
      checkup: "Ko'rik",
      reminder: 'Eslatma',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      appointment: 'bg-blue-100 text-blue-700',
      checkup: 'bg-purple-100 text-purple-700',
      reminder: 'bg-green-100 text-green-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-orange-600" size={20} />;
      case 'sent':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'failed':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Kutilmoqda',
      sent: 'Yuborildi',
      failed: 'Xatolik',
    };
    return labels[status] || status;
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Aqlli eslatma tizimi</h1>
          <p className="text-gray-600">Avtomatik SMS va Telegram eslatmalari</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Send size={20} />
          Barcha eslatmalarni yuborish
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-blue-600" size={24} />
            <span className="text-gray-600">Jami</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-orange-600" size={24} />
            <span className="text-gray-600">Kutilmoqda</span>
          </div>
          <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <span className="text-gray-600">Yuborildi</span>
          </div>
          <div className="text-3xl font-bold text-green-600">{stats.sent}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-600" size={24} />
            <span className="text-gray-600">Xatolik</span>
          </div>
          <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="text-gray-600" size={20} />
            <span className="font-semibold text-gray-700">Filter:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'pending'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Kutilmoqda
            </button>
            <button
              onClick={() => setSelectedFilter('sent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'sent'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Yuborilgan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                      {getTypeLabel(notification.type)}
                    </span>
                    <span className="text-sm text-gray-600">→</span>
                    <span className="font-semibold text-gray-800">{notification.petName}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{notification.owner}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{notification.phone}</div>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm mb-3">
                    {notification.message}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Kanal:</span>
                      <span className="font-medium text-gray-800">
                        {notification.channel === 'both' ? 'SMS + Telegram' : notification.channel.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Sana:</span>
                      <span className="font-medium text-gray-800">{notification.dueDate}</span>
                    </div>
                    {notification.sentDate && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Yuborildi:</span>
                        <span className="font-medium text-gray-800">{notification.sentDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(notification.status)}
                  <span className="text-sm font-medium text-gray-700">{getStatusLabel(notification.status)}</span>
                </div>
                {notification.status === 'pending' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Send size={16} />
                    Yuborish
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Telegram Bot Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Telegram Bot orqali avtomatik eslatmalar</h3>
            <p className="text-blue-100">
              Hayvon egalari bot orqali emlash vaqtlarini ko'rishlari, analiz natijalarini yuklab olishlari va
              qabulga yozilishlari mumkin.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Bot sozlamalari
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
