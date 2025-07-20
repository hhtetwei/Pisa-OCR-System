import { Header } from '@/components/layouts/header';
import { Table } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { ExportButton } from '@/components/ui/export-button';
import { adminTableHeaders } from '../constants/admin-table-headers';
import { getAdmins, useGetAdmins } from '../api/get-admins';
import { useFilterAdmins } from '../hooks';
import { AdminForm, AdminTableActions } from '../components';

const AddAdmin = () => {
  const [isOpen, { open, close }] = useDisclosure();
  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={open} leftIcon={<FaPlus />}>
        {t('Add Admin')}
      </Button>
      <AdminForm isOpen={isOpen} close={close} />
    </div>
  );
};
export const AdminList = () => {
  const { data: admins } = useGetAdmins();
  const { onPaginate, getAllSearchParams } = useFilterAdmins();
  const { page = 1, limit = 10 } = getAllSearchParams();

  const { t } = useTranslation();


  const translatedAdminTableHeaders = Object.fromEntries(
    Object.entries(adminTableHeaders).map(([key, value]) => [key, t(value)])
  );




  return (
    <div className="w-full">
      <Header title="Admins" />  

      <div className='flex justify-end p-3 gap-5'>
       <div> <AddAdmin /></div>
        
        <div className='-mt-1'>
          <ExportButton
            getData={async () => {
              return getAdmins({
                skip: 0,
                limit: 0,
              }).then((res) => res.data);
            }}
            format={(data) => ({
              name: data.user ? `${data.user.name} ${data.user.surname}` : '-',
              email: data.user?.email ?? '-',
              phone: data.user?.phoneNumber ?? '-',
            })}
            className="hover:text-black"
            filename="Total Teachers"
          /></div>
    </div>

      <div className='mt-5 p-5'>
      {admins?.data && (
          <>
            <Table
              data={admins?.data}
              headerMapping={translatedAdminTableHeaders}
              renderCells={(admin) => {
                const user = admin.user;
              
                return {
                  name: user ? `${user.name} ${user.surname}` : '-',
                  email: user?.email ?? '-',
                  phoneNumber: user?.phoneNumber ?? '-',
                  accountStatus: user ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.accountStatus === 'Online'
                          ? 'bg-green-100 text-green-500'
                          : 'bg-red-100 text-red-500'
                      }`}
                    >
                      {user.accountStatus}
                    </span>
                  ) : (
                    '-'
                  ),
                  action: <AdminTableActions data={admin} />,
                };
              }}
              keyExtract="id"
              noDataMessage={t('No Data Available in the table')}
            />
            <Pagination
              value={parseInt(page)}
              total={Math.ceil(admins?.count / limit)}
              onChange={onPaginate}
            />
          </>
        )}
      </div>  
    </div>
  );
};
