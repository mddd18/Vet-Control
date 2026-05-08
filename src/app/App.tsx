import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from './components/Dashboard';
import { PetRecords } from './components/PetRecords';
import { Appointments } from './components/Appointments';
import { Finance } from './components/Finance';
import { Notifications } from './components/Notifications';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'pets' | 'appointments' | 'finance' | 'notifications'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pets':
        return <PetRecords />;
      case 'appointments':
        return <Appointments />;
      case 'finance':
        return <Finance />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
