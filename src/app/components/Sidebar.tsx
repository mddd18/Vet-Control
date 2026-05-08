import { Home, Users, Calendar, DollarSign, Bell, PawPrint } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'pets' | 'appointments' | 'finance' | 'notifications') => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', labelUz: 'Bosh sahifa' },
    { id: 'pets', icon: Users, label: 'Pet Records', labelUz: 'Tibbiy kartalar' },
    { id: 'appointments', icon: Calendar, label: 'Appointments', labelUz: 'Qabullar' },
    { id: 'finance', icon: DollarSign, label: 'Finance', labelUz: 'Moliya' },
    { id: 'notifications', icon: Bell, label: 'Notifications', labelUz: 'Eslatmalar' },
  ];

  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-blue-500"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="bg-white rounded-lg p-2"
          >
            <PawPrint className="text-blue-600" size={32} />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl">Vet-Control</h1>
            <p className="text-blue-200 text-sm">CRM Platform</p>
          </div>
        </div>
      </motion.div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-white text-blue-600'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              <Icon size={20} />
              <div className="text-left">
                <div className="font-medium">{item.labelUz}</div>
              </div>
            </motion.button>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 border-t border-blue-500"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center font-bold">
            D
          </div>
          <div>
            <div className="font-medium">Dr. Karimov</div>
            <div className="text-sm text-blue-200">Veterinar</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
