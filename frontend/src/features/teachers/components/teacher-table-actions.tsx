
import { Menu } from '@mantine/core';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Teachers } from '../types';
import { useAuth } from '@/features/auth/hooks';
import { UserType } from '@/features/user/types';
import { Button } from '@/components/ui/button';
import { TeacherForm } from './teacher-form';
;



export const TeacherTableActions = ({ data }: { data: Teachers }) => {
  const [isOpenEditModal, { close: closeEditModal, open: openEditModal }] = useDisclosure();
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
         
         
        </Menu.Dropdown>
      </Menu>
     
      <TeacherForm isOpen={isOpenEditModal} close={closeEditModal} oldData={data} />
    </>
  );
};
