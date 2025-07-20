import { Header } from '@/components/layouts/header';
import { getTeachers, useGetTeachers } from "../api/get-teacher";
import { Table } from '@/components/ui/table';
import { teacherTableHeaders } from '../constants';
import { Pagination } from '@/components/ui/pagination';
import { useFilterTeachers } from '../hooks';
import { TeacherTableActions } from '../components/teacher-table-actions';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { TeacherForm } from '../components/teacher-form';
import { ExportButton } from '@/components/ui/export-button';


const AddTeacher = () => {
  const [isOpen, { open, close }] = useDisclosure();
  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={open} leftIcon={<FaPlus />}>
        {t('Add Teacher')}
      </Button>
      <TeacherForm isOpen={isOpen} close={close} />
    </div>
  );
};
export const TeacherList = () => {
  const { data: teachers } = useGetTeachers();
  const { onPaginate, getAllSearchParams } = useFilterTeachers();
  const { page = 1, limit = 10 } = getAllSearchParams();

  const { t } = useTranslation();


  const translatedTeacherHeaders = Object.fromEntries(
    Object.entries(teacherTableHeaders).map(([key, value]) => [key, t(value)])
  );


  return (
    <div className="w-full">
      <Header title="Teachers" />  

      <div className='flex justify-end p-3 gap-5'>
       <div> <AddTeacher /></div>
        
        <div className='-mt-1'>
          <ExportButton
            getData={async () => {
              return getTeachers({
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
      {teachers?.data && (
          <>
            <Table
              data={teachers?.data}
              headerMapping={translatedTeacherHeaders}
              renderCells={(teacher) => {
                const user = teacher.user;
              
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
                  action: <TeacherTableActions data={teacher} />,
                };
              }}
              keyExtract="id"
              noDataMessage={t('No Data Available in the table')}
            />
            <Pagination
              value={parseInt(page)}
              total={Math.ceil(teachers?.count / limit)}
              onChange={onPaginate}
            />
          </>
        )}
      </div>  
    </div>
  );
};
