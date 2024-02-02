'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("token")? true: false; 

      if (!isAuthenticated) {
        router.push('/'); 
      }
    }, [router]);

    if (typeof window !== 'undefined') {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
