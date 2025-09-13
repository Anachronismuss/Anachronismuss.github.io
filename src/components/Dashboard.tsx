import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp,
  Clock,
  AlertTriangle,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { DashboardStats } from '../types';

// Mock data
const mockStats: DashboardStats = {
  totalMembers: 156,
  activeMembers: 142,
  todayAppointments: 12,
  monthlyRevenue: 45600,
  expiringMemberships: 8,
  pendingPayments: 3
};

const todayAppointments = [
  { id: '1', time: '09:00', memberName: 'Ayşe Demir', type: 'Konsültasyon' },
  { id: '2', time: '10:30', memberName: 'Mehmet Yılmaz', type: 'Kontrol' },
  { id: '3', time: '14:00', memberName: 'Fatma Kaya', type: 'Ölçüm' },
  { id: '4', time: '15:30', memberName: 'Ali Özkan', type: 'Konsültasyon' },
];

const recentPayments = [
  { id: '1', memberName: 'Zeynep Aktaş', amount: 450, type: 'Üyelik', date: '2024-01-15' },
  { id: '2', memberName: 'Burak Şen', amount: 200, type: 'Konsültasyon', date: '2024-01-15' },
  { id: '3', memberName: 'Elif Çelik', amount: 600, type: 'Premium Üyelik', date: '2024-01-14' },
];

export default function Dashboard() {
  const { user } = useAuth();

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    change 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    color: string;
    change?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ana Panel</h1>
          <p className="text-gray-600">Hoş geldin, {user?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Bugün</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Üye"
          value={mockStats.totalMembers}
          icon={Users}
          color="bg-blue-500"
          change="+12 bu ay"
        />
        <StatCard
          title="Aktif Üye"
          value={mockStats.activeMembers}
          icon={UserCheck}
          color="bg-green-500"
          change="+5 bu hafta"
        />
        <StatCard
          title="Bugün Randevu"
          value={mockStats.todayAppointments}
          icon={Calendar}
          color="bg-purple-500"
        />
        {user?.role === 'admin' && (
          <StatCard
            title="Aylık Ciro"
            value={`₺${mockStats.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="bg-emerald-500"
            change="+18% geçen aya göre"
          />
        )}
      </div>

      {/* Alerts */}
      {user?.role === 'admin' && (mockStats.expiringMemberships > 0 || mockStats.pendingPayments > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="text-sm font-medium text-amber-800">Dikkat Gereken Durumlar</h3>
          </div>
          <div className="space-y-1 text-sm text-amber-700">
            {mockStats.expiringMemberships > 0 && (
              <p>• {mockStats.expiringMemberships} üyenin üyeliği bu hafta bitiyor</p>
            )}
            {mockStats.pendingPayments > 0 && (
              <p>• {mockStats.pendingPayments} bekleyen ödeme var</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Bugünün Randevuları</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.memberName}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Bugün randevu yok</p>
            )}
          </div>
        </div>

        {/* Recent Payments - Only for admin */}
        {user?.role === 'admin' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Son Ödemeler</h3>
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{payment.memberName}</p>
                      <p className="text-sm text-gray-600">{payment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">₺{payment.amount}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}