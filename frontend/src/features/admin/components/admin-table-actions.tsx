
import { Menu } from '@mantine/core';
import { FaEdit, FaEye } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks';
import { UserType } from '@/features/user/types';
import { Button } from '@/components/ui/button';
import { Admins } from '../types';
import { AdminForm } from './admin-form';


export const AdminTableActions = ({ data }: { data: Admins }) => {
  const [isOpenViewModal, { close: closeViewModal, open: openViewModal }] = useDisclosure();
  const [isOpenEditModal, { close: closeEditModal, open: openEditModal }] = useDisclosure();
  const [isOpenDeleteModal, { close: closeDeleteModal, open: openDeleteModal }] = useDisclosure();
  const { t } = useTranslation();

  const { user } = useAuth();
  const isAdmin = user?.type === UserType.ADMIN;

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button rightIcon={<IoIosArrowDown />}>{t('Actions')}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {isAdmin && (
            <Menu.Item leftSection={<FaEdit />} onClick={openEditModal}>
              {t('Edit')}
            </Menu.Item>
          )}
         
          {isAdmin && (
            <Menu.Item leftSection={<FaEye />} onClick={openDeleteModal}>
              {t('Delete Admin')}
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
     
      <AdminForm isOpen={isOpenEditModal} close={closeEditModal} oldData={data} />
    </>
  );
};
