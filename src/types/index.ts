export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'dietitian';
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  membershipType: 'basic' | 'premium' | 'vip';
  membershipStart: string;
  membershipEnd: string;
  status: 'active' | 'inactive' | 'expired';
  assignedDietitian?: string;
  totalPaid: number;
  remainingBalance: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  memberId: string;
  memberName: string;
  dietitianId: string;
  dietitianName: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'measurement';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  type: 'membership' | 'consultation' | 'supplement' | 'other';
  method: 'cash' | 'card' | 'transfer';
  date: string;
  description?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'appointment_reminder' | 'payment_due' | 'membership_expiring' | 'birthday';
  recipientId: string;
  recipientName: string;
  message: string;
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  todayAppointments: number;
  monthlyRevenue: number;
  expiringMemberships: number;
  pendingPayments: number;
}