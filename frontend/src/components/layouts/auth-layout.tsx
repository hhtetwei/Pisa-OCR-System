import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="relative overflow-hidden max-h-screen flex justify-center p-5">
      <Outlet />
    </div>
  );
};
