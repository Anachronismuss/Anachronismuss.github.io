import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  PieChart,
  Activity,
  Target,
  Clock
} from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts and reports
  const monthlyRevenue = [
    { month: 'Ocak', revenue: 45600, members: 142 },
    { month: 'Şubat', revenue: 52300, members: 156 },
    { month: 'Mart', revenue: 48900, members: 149 },
    { month: 'Nisan', revenue: 61200, members: 168 },
    { month: 'Mayıs', revenue: 58700, members: 172 },
    { month: 'Haziran', revenue: 67400, members: 185 }
  ];

  const membershipTypes = [
    { type: 'Temel', count: 85, percentage: 46, revenue: 25500 },
    { type: 'Premium', count: 67, percentage: 36, revenue: 40200 },
    { type: 'VIP', count: 33, percentage: 18, revenue: 39600 }
  ];

  const dietitianPerformance = [
    { name: 'Dr. Ayşe Yılmaz', appointments: 124, revenue: 24800, satisfaction: 4.8 },
    { name: 'Dr. Mehmet Kaya', appointments: 98, revenue: 19600, satisfaction: 4.6 },
    { name: 'Dr. Elif Demir', appointments: 87, revenue: 17400, satisfaction: 4.7 }
  ];

  const topMetrics = [
    { label: 'Toplam Gelir', value: '₺67,400', change: '+18%', color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Aktif Üye', value: '185', change: '+12%', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Aylık Randevu', value: '309', change: '+8%', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Ortalama Gelir/Üye', value: '₺364', change: '+5%', color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Raporlar & Analiz</h1>
          <p className="text-gray-600">Detaylı iş analitiği ve performans raporları</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Bu Hafta</option>
            <option value="month">Bu Ay</option>
            <option value="quarter">Bu Çeyrek</option>
            <option value="year">Bu Yıl</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.color}`}>
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  {metric.change} geçen aya göre
                </p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <BarChart3 className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Rapor Türü:</span>
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
              { id: 'financial', label: 'Finansal', icon: DollarSign },
              { id: 'members', label: 'Üye Analizi', icon: Users },
              { id: 'performance', label: 'Performans', icon: Target }
            ].map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    reportType === type.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Aylık Gelir Trendi</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyRevenue.slice(-6).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{data.members} üye</span>
                  <span className="text-sm font-bold text-green-600">₺{data.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Üyelik Türü Dağılımı</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {membershipTypes.map((type, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{type.type}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{type.count} üye</span>
                    <span className="text-sm font-bold text-blue-600">%{type.percentage}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-600 font-medium">₺{type.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dietitian Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Diyetisyen Performansı</h3>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 rounded-lg">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Diyetisyen</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Randevu Sayısı</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Gelir</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Memnuniyet</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Performans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dietitianPerformance.map((dietitian, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {dietitian.name.split(' ')[1].charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{dietitian.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{dietitian.appointments}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-green-600">₺{dietitian.revenue.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(dietitian.satisfaction) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{dietitian.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(dietitian.satisfaction / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {Math.round((dietitian.satisfaction / 5) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">En Popüler Saatler</h4>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { time: '09:00-11:00', percentage: 35 },
              { time: '14:00-16:00', percentage: 28 },
              { time: '16:00-18:00', percentage: 22 },
              { time: '11:00-13:00', percentage: 15 }
            ].map((slot, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{slot.time}</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${slot.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{slot.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Üye Yaş Dağılımı</h4>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { age: '18-25', count: 45, percentage: 24 },
              { age: '26-35', count: 67, percentage: 36 },
              { age: '36-45', count: 52, percentage: 28 },
              { age: '46+', count: 21, percentage: 12 }
            ].map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{group.age} yaş</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{group.count} kişi</span>
                  <span className="text-sm font-medium text-gray-900">{group.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Aylık Hedefler</h4>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Gelir Hedefi</span>
                <span className="text-sm font-medium text-gray-900">₺70,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-green-600">96% tamamlandı</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Yeni Üye</span>
                <span className="text-sm font-medium text-gray-900">25</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-blue-600">18/25 tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}