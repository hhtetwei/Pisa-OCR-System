
import { Avatar, Menu } from '@mantine/core';

import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../features/auth/hooks';
import { useLogout } from '@/features/auth/api/logout';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitch } from '@/language/components/language-switch';


export const Topbar = ({ toggle }: { toggle: () => void }) => {
  const navigate = useNavigate();

const {user, onLogout} = useAuth()

const { mutate } = useLogout();
  const onSignOut = () => {
  
  mutate(undefined, {
    onSuccess: () => {
      onLogout();
      navigate('/auth/login');
    },
  });
};

  return (
    <div className="bg-gray-400 flex justify-between items-center px-5 h-[60px] shadow-lg">
      <div className="flex items-center gap-5">
        <FiMenu className="text-3xl cursor-pointer text-primary-900" onClick={toggle} />
        <div className="h-[50px] w-[200px] flex justify-center items-center font-bold">
          Pisa Grading System
        </div>
      </div>
      <div className="flex items-center gap-3">
       
        <LanguageSwitch />
      <Menu>
  <Menu.Target>
    <div className="flex gap-2 items-center cursor-pointer">
      <Avatar
        size="md"
        name={user?.name}
        color="white"
        className="bottom-1 border-gray-700 border-solid"
      />
      <div className="flex flex-col">
        <span>{user?.name}</span>
        <span className="text-xs">{user?.email}</span>
      </div>
    </div>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Item onClick={onSignOut}>Logout</Menu.Item>
  </Menu.Dropdown>
</Menu>

      </div>
    </div>
  );
};
