import { AuthenticationForm } from '@/app/shared/ui/auth/login/login';
import React from 'react';

const LoginPage: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <AuthenticationForm />
  </div>
);

export default LoginPage;
