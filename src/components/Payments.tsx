import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  DollarSign,
  Calendar,
  User,
  Receipt,
  AlertTriangle
} from 'lucide-react';
import { Payment } from '../types';

// Mock data
const mockPayments: Payment[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Ayşe Demir',
    amount: 1200,
    type: 'membership',
    method: 'card',
    date: '2024-01-15',
    description: 'Premium üyelik yenileme',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Mehmet Yılmaz',
    amount: 200,
    type: 'consultation',
    method: 'cash',
    date: '2024-01-14',
    description: 'Diyetisyen konsültasyonu',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Fatma Kaya',
    amount: 600,
    type: 'membership',
    method: 'transfer',
    date: '2024-01-13',
    description: 'Temel üyelik',
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    memberId: '1',
    memberName: 'Ayşe Demir',
    amount: 150,
    type: 'supplement',
    method: 'card',
    date: '2024-01-12',
    description: 'Protein tozu',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    memberId: '4',
    memberName: 'Ali Özkan',
    amount: 800,
    type: 'membership',
    method: 'cash',
    date: '2024-01-11',
    description: 'VIP üyelik',
    createdAt: '2024-01-11'
  }
];

// Mock pending payments
const mockPendingPayments = [
  { id: '1', memberName: 'Zeynep Aktaş', amount: 450, dueDate: '2024-01-20', type: 'Üyelik yenileme' },
  { id: '2', memberName: 'Burak Şen', amount: 200, dueDate: '2024-01-18', type: 'Konsültasyon' },
  { id: '3', memberName: 'Elif Çelik', amount: 300, dueDate: '2024-01-22', type: 'Ek hizmet' }
];

export default function Payments() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    
    return matchesSearch && matchesType && matchesMethod;
  });

  // Calculate stats
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const monthlyRevenue = payments
    .filter(payment => new Date(payment.date).getMonth() === new Date().getMonth())
    .reduce((sum, payment) => sum + payment.amount, 0);
  const todayPayments = payments.filter(payment => payment.date === new Date().toISOString().split('T')[0]);
  const pendingAmount = mockPendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const getTypeText = (type: string) => {
    switch (type) {
      case 'membership': return 'Üyelik';
      case 'consultation': return 'Konsültasyon';
      case 'supplement': return 'Supplement';
      case 'other': return 'Diğer';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'membership': return 'bg-blue-100 text-blue-800';
      case 'consultation': return 'bg-green-100 text-green-800';
      case 'supplement': return 'bg-purple-100 text-purple-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'cash': return 'Nakit';
      case 'card': return 'Kart';
      case 'transfer': return 'Havale';
      default: return method;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'cash': return 'bg-green-100 text-green-800';
      case 'card': return 'bg-blue-100 text-blue-800';
      case 'transfer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ödemeler</h1>
          <p className="text-gray-600">Tüm ödemeleri görüntüle ve yönet</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ödeme
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Ciro</p>
              <p className="text-2xl font-bold text-gray-900">₺{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bu Ay</p>
              <p className="text-2xl font-bold text-gray-900">₺{monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +15% geçen aya göre
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bugün</p>
              <p className="text-2xl font-bold text-gray-900">{todayPayments.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                ₺{todayPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Receipt className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen</p>
              <p className="text-2xl font-bold text-red-600">₺{pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{mockPendingPayments.length} ödeme</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Payments Alert */}
      {mockPendingPayments.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-medium text-amber-800">Bekleyen Ödemeler</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockPendingPayments.map((payment) => (
              <div key={payment.id} className="bg-white rounded-lg p-4 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{payment.memberName}</p>
                  <p className="font-bold text-red-600">₺{payment.amount}</p>
                </div>
                <p className="text-sm text-gray-600 mb-1">{payment.type}</p>
                <p className="text-xs text-amber-600">Vade: {new Date(payment.dueDate).toLocaleDateString('tr-TR')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Üye adı veya açıklama ara"
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Türler</option>
                <option value="membership">Üyelik</option>
                <option value="consultation">Konsültasyon</option>
                <option value="supplement">Supplement</option>
                <option value="other">Diğer</option>
              </select>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Yöntemler</option>
                <option value="cash">Nakit</option>
                <option value="card">Kart</option>
                <option value="transfer">Havale</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tarih</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Üye</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tutar</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tür</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Yöntem</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">
                      {new Date(payment.date).toLocaleDateString('tr-TR')}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-900">{payment.memberName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-lg font-bold text-green-600">₺{payment.amount.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(payment.type)}`}>
                      {getTypeText(payment.type)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getMethodColor(payment.method)}`}>
                      {getMethodText(payment.method)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {payment.description || '-'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aradığınız kriterlere uygun ödeme bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}