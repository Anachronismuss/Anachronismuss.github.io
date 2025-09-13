import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Check,
  X,
  DollarSign,
  Calendar,
  Star,
  Settings
} from 'lucide-react';
import { MembershipPackage } from '../types';

// Mock data
const mockPackages: MembershipPackage[] = [
  {
    id: '1',
    name: 'Temel Paket',
    price: 300,
    duration: 1,
    features: ['Temel beslenme danışmanlığı', 'Aylık 2 randevu', 'Temel ölçüm takibi'],
    color: 'blue',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Premium Paket',
    price: 600,
    duration: 3,
    features: ['Detaylı beslenme programı', 'Haftalık randevu', 'Detaylı ölçüm analizi', 'WhatsApp desteği'],
    color: 'purple',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'VIP Paket',
    price: 1200,
    duration: 6,
    features: ['Kişisel beslenme koçluğu', 'Sınırsız randevu', 'Haftalık detaylı rapor', '7/24 WhatsApp desteği', 'Özel diyet programı'],
    color: 'amber',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export default function MembershipPackages() {
  const [packages, setPackages] = useState<MembershipPackage[]>(mockPackages);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<MembershipPackage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    features: [''],
    color: 'blue'
  });

  const colorOptions = [
    { value: 'blue', label: 'Mavi', class: 'bg-blue-500' },
    { value: 'purple', label: 'Mor', class: 'bg-purple-500' },
    { value: 'amber', label: 'Altın', class: 'bg-amber-500' },
    { value: 'green', label: 'Yeşil', class: 'bg-green-500' },
    { value: 'red', label: 'Kırmızı', class: 'bg-red-500' },
    { value: 'indigo', label: 'İndigo', class: 'bg-indigo-500' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const packageData: MembershipPackage = {
      id: editingPackage?.id || Date.now().toString(),
      name: formData.name,
      price: parseInt(formData.price),
      duration: parseInt(formData.duration),
      features: formData.features.filter(f => f.trim() !== ''),
      color: formData.color,
      isActive: true,
      createdAt: editingPackage?.createdAt || new Date().toISOString()
    };

    if (editingPackage) {
      setPackages(prev => prev.map(pkg => pkg.id === editingPackage.id ? packageData : pkg));
    } else {
      setPackages(prev => [...prev, packageData]);
    }

    setShowAddModal(false);
    setEditingPackage(null);
    setFormData({ name: '', price: '', duration: '', features: [''], color: 'blue' });
  };

  const handleEdit = (pkg: MembershipPackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      duration: pkg.duration.toString(),
      features: [...pkg.features],
      color: pkg.color
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu paketi silmek istediğinizden emin misiniz?')) {
      setPackages(prev => prev.filter(pkg => pkg.id !== id));
    }
  };

  const togglePackageStatus = (id: string) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Üyelik Paketleri</h1>
          <p className="text-gray-600">Üyelik paketlerini yönet ve düzenle</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Paket
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const colors = getColorClasses(pkg.color);
          return (
            <div key={pkg.id} className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6 relative`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Package className={`w-6 h-6 ${colors.text} mr-2`} />
                  <h3 className={`text-lg font-bold ${colors.text}`}>{pkg.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`p-1 rounded ${pkg.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {pkg.isActive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <DollarSign className={`w-5 h-5 ${colors.text} mr-1`} />
                  <span className={`text-2xl font-bold ${colors.text}`}>₺{pkg.price}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className={`w-4 h-4 ${colors.text} mr-1`} />
                  <span className={`text-sm ${colors.text}`}>{pkg.duration} ay</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className={`font-medium ${colors.text} mb-2`}>Özellikler:</h4>
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Star className={`w-4 h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`} />
                    <span className={`text-sm ${colors.text}`}>{feature}</span>
                  </div>
                ))}
              </div>

              {!pkg.isActive && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-xl flex items-center justify-center">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Pasif
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingPackage ? 'Paketi Düzenle' : 'Yeni Paket Oluştur'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paket Adı
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Süre (Ay)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Renk
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`flex items-center p-2 rounded-lg border-2 transition-colors ${
                        formData.color === color.value ? 'border-gray-400' : 'border-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${color.class} mr-2`}></div>
                      <span className="text-sm">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Özellikler
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Özellik açıklaması"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Özellik Ekle
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingPackage(null);
                    setFormData({ name: '', price: '', duration: '', features: [''], color: 'blue' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingPackage ? 'Güncelle' : 'Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}