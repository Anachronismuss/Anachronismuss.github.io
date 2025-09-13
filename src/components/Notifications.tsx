import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Filter,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  MessageSquare,
  Gift,
  AlertTriangle
} from 'lucide-react';
import { Notification } from '../types';

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment_reminder',
    recipientId: '1',
    recipientName: 'Ayşe Demir',
    message: 'Yarın saat 09:00\'da randevunuz bulunmaktadır. Dr. Ayşe Yılmaz ile konsültasyon.',
    scheduledFor: '2024-01-16T08:00:00',
    status: 'sent',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    type: 'payment_due',
    recipientId: '2',
    recipientName: 'Mehmet Yılmaz',
    message: 'Üyelik ödemenizin son tarihi yaklaşıyor. Lütfen en kısa sürede ödemenizi yapınız.',
    scheduledFor: '2024-01-17T10:00:00',
    status: 'pending',
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    type: 'membership_expiring',
    recipientId: '3',
    recipientName: 'Fatma Kaya',
    message: 'Üyeliğiniz 5 gün içinde sona erecek. Yenileme için bizimle iletişime geçin.',
    scheduledFor: '2024-01-18T09:00:00',
    status: 'pending',
    createdAt: '2024-01-15'
  },
  {
    id: '4',
    type: 'birthday',
    recipientId: '4',
    recipientName: 'Ali Özkan',
    message: 'Doğum gününüz kutlu olsun! Size özel %20 indirim fırsatımızdan yararlanabilirsiniz.',
    scheduledFor: '2024-01-20T09:00:00',
    status: 'pending',
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    type: 'appointment_reminder',
    recipientId: '5',
    recipientName: 'Zeynep Aktaş',
    message: 'Bugün saat 14:00\'da randevunuz var. Dr. Mehmet Kaya ile kontrol randevusu.',
    scheduledFor: '2024-01-16T13:00:00',
    status: 'failed',
    createdAt: '2024-01-15'
  }
];

export default function Notifications() {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate stats
  const pendingCount = notifications.filter(n => n.status === 'pending').length;
  const sentCount = notifications.filter(n => n.status === 'sent').length;
  const failedCount = notifications.filter(n => n.status === 'failed').length;
  const todayCount = notifications.filter(n => 
    new Date(n.scheduledFor).toDateString() === new Date().toDateString()
  ).length;

  const getTypeText = (type: string) => {
    switch (type) {
      case 'appointment_reminder': return 'Randevu Hatırlatma';
      case 'payment_due': return 'Ödeme Hatırlatma';
      case 'membership_expiring': return 'Üyelik Bitiş';
      case 'birthday': return 'Doğum Günü';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment_reminder': return 'bg-blue-100 text-blue-800';
      case 'payment_due': return 'bg-red-100 text-red-800';
      case 'membership_expiring': return 'bg-yellow-100 text-yellow-800';
      case 'birthday': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment_reminder': return <Calendar className="w-4 h-4" />;
      case 'payment_due': return <AlertTriangle className="w-4 h-4" />;
      case 'membership_expiring': return <Clock className="w-4 h-4" />;
      case 'birthday': return <Gift className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Bekliyor';
      case 'sent': return 'Gönderildi';
      case 'failed': return 'Başarısız';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'sent': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bildirimler</h1>
          <p className="text-gray-600">Otomatik bildirimler ve mesajlar</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Bildirim
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gönderildi</p>
              <p className="text-2xl font-bold text-green-600">{sentCount}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Başarısız</p>
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bugün</p>
              <p className="text-2xl font-bold text-blue-600">{todayCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">Randevu Hatırlatması</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700 font-medium">Ödeme Hatırlatması</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <Clock className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-yellow-700 font-medium">Üyelik Uyarısı</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Gift className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Doğum Günü</span>
          </button>
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
                placeholder="Üye adı veya mesaj ara"
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
                <option value="appointment_reminder">Randevu Hatırlatma</option>
                <option value="payment_due">Ödeme Hatırlatma</option>
                <option value="membership_expiring">Üyelik Bitiş</option>
                <option value="birthday">Doğum Günü</option>
              </select>
            </div>
            <div className="flex items-center">
              <Bell className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Bekleyen</option>
                <option value="sent">Gönderildi</option>
                <option value="failed">Başarısız</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tür</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Alıcı</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Mesaj</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Gönderim Zamanı</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Durum</th>
                <th className="text-center py-3 px-6 font-medium text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${getTypeColor(notification.type).replace('text-', 'bg-').replace('800', '100')}`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                        {getTypeText(notification.type)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-900">{notification.recipientName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-600 max-w-md truncate">
                      {notification.message}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(notification.scheduledFor).toLocaleDateString('tr-TR')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.scheduledFor).toLocaleTimeString('tr-TR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                        {getStatusIcon(notification.status)}
                        <span className="ml-1">{getStatusText(notification.status)}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      {notification.status === 'pending' && (
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      {notification.status === 'failed' && (
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aradığınız kriterlere uygun bildirim bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}