import { useState } from 'react';
import { Search, Plus, Dog, Cat, FileText, Activity, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface Pet {
  id: number;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: string;
  owner: string;
  phone: string;
  lastVisit: string;
  nextVaccination: string;
  status: 'healthy' | 'treatment' | 'checkup';
}

export function PetRecords() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const pets: Pet[] = [
    {
      id: 1,
      name: 'Bobik',
      type: 'dog',
      breed: 'Nemis cho\'pon iti',
      age: '3 yosh',
      owner: 'Aliyev Sardor',
      phone: '+998 90 123 45 67',
      lastVisit: '2026-05-05',
      nextVaccination: '2026-05-10',
      status: 'healthy',
    },
    {
      id: 2,
      name: 'Murka',
      type: 'cat',
      breed: 'Shotland mushuki',
      age: '2 yosh',
      owner: 'Karimova Dilnoza',
      phone: '+998 91 234 56 78',
      lastVisit: '2026-05-07',
      nextVaccination: '2026-05-12',
      status: 'healthy',
    },
    {
      id: 3,
      name: 'Rex',
      type: 'dog',
      breed: 'Labrador',
      age: '5 yosh',
      owner: 'Toshmatov Javohir',
      phone: '+998 93 345 67 89',
      lastVisit: '2026-05-07',
      nextVaccination: '2026-05-15',
      status: 'treatment',
    },
    {
      id: 4,
      name: 'Fluffy',
      type: 'cat',
      breed: 'Pers mushuki',
      age: '1 yosh',
      owner: 'Nazarova Malika',
      phone: '+998 94 456 78 90',
      lastVisit: '2026-05-06',
      nextVaccination: '2026-06-01',
      status: 'checkup',
    },
  ];

  const medicalHistory = [
    { date: '2026-05-05', type: 'Qabul', description: 'Umumiy tekshiruv', doctor: 'Dr. Karimov', status: 'Bajarildi' },
    { date: '2026-04-15', type: 'Ko\'rik', description: 'Sog\'liqni tekshirish', doctor: 'Dr. Karimov', status: 'Bajarildi' },
    { date: '2026-03-20', type: 'Operatsiya', description: 'Sterilizatsiya', doctor: 'Dr. Karimov', status: 'Bajarildi' },
    { date: '2026-02-10', type: 'Analiz', description: 'Qon analizi', doctor: 'Dr. Karimov', status: 'Normal' },
  ];

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Raqamli Tibbiy Kartalar</h1>
          <p className="text-gray-600">Hayvonlarning to'liq tibbiy tarixi</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Yangi bemor qo'shish
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white rounded-lg shadow p-6"
        >
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredPets.map((pet, index) => (
              <motion.button
                key={pet.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPet(pet)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedPet?.id === pet.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${pet.type === 'dog' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                    {pet.type === 'dog' ? (
                      <Dog className={pet.type === 'dog' ? 'text-blue-600' : 'text-purple-600'} size={24} />
                    ) : (
                      <Cat className="text-purple-600" size={24} />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{pet.name}</div>
                    <div className="text-sm text-gray-600">{pet.breed}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{pet.owner}</div>
                <div className="mt-2">
                  {pet.status === 'healthy' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Sog'lom</span>
                  )}
                  {pet.status === 'treatment' && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Davolanmoqda</span>
                  )}
                  {pet.status === 'checkup' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Ko'rik kerak</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pet Details */}
        <div className="lg:col-span-2">
          {selectedPet ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Basic Info Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${selectedPet.type === 'dog' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                      {selectedPet.type === 'dog' ? (
                        <Dog className={selectedPet.type === 'dog' ? 'text-blue-600' : 'text-purple-600'} size={48} />
                      ) : (
                        <Cat className="text-purple-600" size={48} />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPet.name}</h2>
                      <p className="text-gray-600">{selectedPet.breed}</p>
                      <p className="text-sm text-gray-500">{selectedPet.age}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Egasi:</div>
                    <div className="font-semibold text-gray-800">{selectedPet.owner}</div>
                    <div className="text-sm text-gray-600">{selectedPet.phone}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Calendar size={20} />
                      <span className="font-medium">Oxirgi tashrif</span>
                    </div>
                    <div className="text-gray-800 font-semibold">{selectedPet.lastVisit}</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-600 mb-2">
                      <Calendar size={20} />
                      <span className="font-medium">Keyingi qabul</span>
                    </div>
                    <div className="text-gray-800 font-semibold">{selectedPet.nextVaccination}</div>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-blue-600" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">Tibbiy tarix</h3>
                </div>

                <div className="space-y-3">
                  {medicalHistory.map((record, index) => (
                    <div key={index} className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Activity className="text-blue-600" size={20} />
                          <div>
                            <div className="font-semibold text-gray-800">{record.type}</div>
                            <div className="text-sm text-gray-600">{record.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{record.date}</div>
                          <div className="text-xs text-gray-500">{record.doctor}</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                          {record.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all font-medium">
                  + Yangi yozuv qo'shish
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Qabul qo'shish
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Analiz qo'shish
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Retsept yozish
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow p-12 text-center"
            >
              <FileText className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Bemorni tanlang</h3>
              <p className="text-gray-500">Tibbiy kartani ko'rish uchun chap tarafdan bemorni tanlang</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
