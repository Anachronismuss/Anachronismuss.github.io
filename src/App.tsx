import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Appointments from './components/Appointments';
import Payments from './components/Payments';
import Notifications from './components/Notifications';
import Reports from './components/Reports';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  if (!user) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />;
      case 'appointments':
        return <Appointments />;
      case 'payments':
        return <Payments />;
      case 'notifications':
        return <Notifications />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
