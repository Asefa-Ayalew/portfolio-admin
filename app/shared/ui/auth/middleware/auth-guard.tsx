'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('userSession');
    console.log('storedUser', storedUser);

    if (storedUser) {
      console.log('storedUser', storedUser)
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthGuard;
