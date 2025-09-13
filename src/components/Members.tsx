import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail,
  Calendar,
  CreditCard,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Member } from '../types';

// Mock data
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Ayşe Demir',
    email: 'ayse.demir@email.com',
    phone: '0532 123 4567',
    birthDate: '1990-05-15',
    membershipType: 'premium',
    membershipStart: '2024-01-01',
    membershipEnd: '2024-12-31',
    status: 'active',
    assignedDietitian: 'Dr. Ayşe Yılmaz',
    totalPaid: 1200,
    remainingBalance: 0,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@email.com',
    phone: '0533 234 5678',
    birthDate: '1985-08-22',
    membershipType: 'basic',
    membershipStart: '2024-01-15',
    membershipEnd: '2024-07-15',
    status: 'active',
    assignedDietitian: 'Dr. Mehmet Kaya',
    totalPaid: 600,
    remainingBalance: 200,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Fatma Kaya',
    email: 'fatma.kaya@email.com',
    phone: '0534 345 6789',
    birthDate: '1992-12-10',
    membershipType: 'vip',
    membershipStart: '2023-12-01',
    membershipEnd: '2024-01-20',
    status: 'expired',
    assignedDietitian: 'Dr. Ayşe Yılmaz',
    totalPaid: 2400,
    remainingBalance: 0,
    createdAt: '2023-12-01'
  }
];

export default function Members() {
  const [members] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'inactive': return 'Pasif';
      case 'expired': return 'Süresi Dolmuş';
      default: return status;
    }
  };

  const getMembershipTypeText = (type: string) => {
    switch (type) {
      case 'basic': return 'Temel';
      case 'premium': return 'Premium';
      case 'vip': return 'VIP';
      default: return type;
    }
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'vip': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Üyeler</h1>
          <p className="text-gray-600">Tüm üyeleri görüntüle ve yönet</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Üye
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Üye ara (isim, email, telefon)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
                <option value="expired">Süresi Dolmuş</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Üye</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">İletişim</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Üyelik</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Durum</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Diyetisyen</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Bakiye</th>
                <th className="text-center py-3 px-6 font-medium text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(member.birthDate).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getMembershipTypeColor(member.membershipType)}`}>
                        {getMembershipTypeText(member.membershipType)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(member.membershipEnd).toLocaleDateString('tr-TR')} bitiş
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {getStatusText(member.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{member.assignedDietitian}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        ₺{member.totalPaid.toLocaleString()}
                      </p>
                      {member.remainingBalance > 0 && (
                        <p className="text-sm text-red-600">
                          -₺{member.remainingBalance.toLocaleString()} borç
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aradığınız kriterlere uygun üye bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}