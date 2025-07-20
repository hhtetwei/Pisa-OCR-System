import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import { useAuth } from '../hooks';


export const Protected = ({ children }: { children: ReactNode }) => {
  const { user, isLoadingUser } = useAuth();
  return (
    <>
      {isLoadingUser ? <LoadingOverlay visible /> : user ? children : <Navigate to="/auth/login" />}
    </>
  );
};
