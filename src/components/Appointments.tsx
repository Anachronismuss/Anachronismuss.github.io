import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  User
} from 'lucide-react';
import { Appointment } from '../types';

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Ayşe Demir',
    dietitianId: '2',
    dietitianName: 'Dr. Ayşe Yılmaz',
    date: '2024-01-16',
    time: '09:00',
    duration: 60,
    type: 'consultation',
    status: 'scheduled',
    notes: 'İlk konsültasyon',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Mehmet Yılmaz',
    dietitianId: '3',
    dietitianName: 'Dr. Mehmet Kaya',
    date: '2024-01-16',
    time: '10:30',
    duration: 45,
    type: 'follow-up',
    status: 'completed',
    notes: 'Kontrol randevusu tamamlandı',
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Fatma Kaya',
    dietitianId: '2',
    dietitianName: 'Dr. Ayşe Yılmaz',
    date: '2024-01-16',
    time: '14:00',
    duration: 30,
    type: 'measurement',
    status: 'cancelled',
    notes: 'Üye iptal etti',
    createdAt: '2024-01-15'
  },
  {
    id: '4',
    memberId: '1',
    memberName: 'Ayşe Demir',
    dietitianId: '2',
    dietitianName: 'Dr. Ayşe Yılmaz',
    date: '2024-01-17',
    time: '15:30',
    duration: 45,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Takip randevusu',
    createdAt: '2024-01-16'
  }
];

export default function Appointments() {
  const { user } = useAuth();
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter appointments based on user role
  const userAppointments = user?.role === 'dietitian' 
    ? appointments.filter(apt => apt.dietitianName === user.name)
    : appointments;

  const filteredAppointments = userAppointments.filter(appointment => {
    const matchesSearch = appointment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.dietitianName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = appointment.date;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = appointmentDate === today;
    } else if (dateFilter === 'upcoming') {
      matchesDate = appointmentDate >= today;
    } else if (dateFilter === 'past') {
      matchesDate = appointmentDate < today;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Planlandı';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal Edildi';
      case 'no-show': return 'Gelmedi';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'no-show': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'consultation': return 'Konsültasyon';
      case 'follow-up': return 'Kontrol';
      case 'measurement': return 'Ölçüm';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-purple-100 text-purple-800';
      case 'follow-up': return 'bg-blue-100 text-blue-800';
      case 'measurement': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Randevular</h1>
          <p className="text-gray-600">
            {user?.role === 'dietitian' ? 'Randevularınızı görüntüle ve yönet' : 'Tüm randevuları görüntüle ve yönet'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Randevu
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Bugün</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Tamamlanan</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredAppointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Bekleyen</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredAppointments.filter(apt => apt.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">İptal</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredAppointments.filter(apt => apt.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Üye veya diyetisyen ara"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="scheduled">Planlandı</option>
                <option value="completed">Tamamlandı</option>
                <option value="cancelled">İptal Edildi</option>
                <option value="no-show">Gelmedi</option>
              </select>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Tarihler</option>
                <option value="today">Bugün</option>
                <option value="upcoming">Gelecek</option>
                <option value="past">Geçmiş</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tarih & Saat</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Üye</th>
                {user?.role === 'admin' && (
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Diyetisyen</th>
                )}
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tür</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Süre</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Durum</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Notlar</th>
                <th className="text-center py-3 px-6 font-medium text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString('tr-TR')}
                      </p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-900">{appointment.memberName}</p>
                    </div>
                  </td>
                  {user?.role === 'admin' && (
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{appointment.dietitianName}</p>
                    </td>
                  )}
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(appointment.type)}`}>
                      {getTypeText(appointment.type)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{appointment.duration} dk</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{getStatusText(appointment.status)}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {appointment.notes || '-'}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aradığınız kriterlere uygun randevu bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}