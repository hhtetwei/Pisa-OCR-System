import { Header } from '@/components/layouts/header';
import { Table } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';

import { ExportButton } from '@/components/ui/export-button';
import { StudentForm } from '../components/student-form';
import { studentTableHeaders } from '../constants';
import { useFilterStudents } from '../hooks';
import { getStudents, useGetStudents } from '../api/get-students';
import { StudentTableActions } from '../components/student-table-actions';



const AddStudent = () => {
  const [isOpen, { open, close }] = useDisclosure();
  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={open} leftIcon={<FaPlus />}>
        {t('Add Student')}
      </Button>
      <StudentForm isOpen={isOpen} close={close} />
    </div>
  );
};

export const StudentList = () => {
  const { data: students } = useGetStudents();
  const { onPaginate, getAllSearchParams } = useFilterStudents();
  const { page = 1, limit = 10 } = getAllSearchParams();

  const { t } = useTranslation();


  const translatedTeacherHeaders = Object.fromEntries(
    Object.entries(studentTableHeaders).map(([key, value]) => [key, t(value)])
  );


  return (
    <div className="w-full">
      <Header title="Students" />  

      <div className='flex justify-end p-3 gap-5'>
       <div> <AddStudent /></div>
        
        <div className='-mt-1'>
          <ExportButton
            getData={async () => {
              return getStudents({
                skip: 0,
                limit: 0,
              }).then((res) => res.data);
            }}
            format={(data) => ({
              name: data.user ? `${data.user.name} ${data.user.surname}` : '-',
               email: data.user?.email ?? '-',
              parentEmail: data.parentEmail ?? '-',
              phone: data.user?.phoneNumber ?? '-',
            })}
            className="hover:text-black"
            filename="Total Students"
          /></div>
    </div>

      <div className='mt-5 p-5'>
      {students?.data && (
          <>
            <Table
              data={students?.data}
              headerMapping={translatedTeacherHeaders}
              renderCells={(student) => {
                const user = student.user;
              
                return {
                  name: user ? `${user.name} ${user.surname}` : '-',
                  email: user?.email ?? '-',
                  parentEmail: student.parentEmail ?? '-',
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
                  action: <StudentTableActions data={student} />,
                };
              }}
              keyExtract="id"
              noDataMessage={t('No Data Available in the table')}
            />
            <Pagination
              value={parseInt(page)}
              total={Math.ceil(students?.count / limit)}
              onChange={onPaginate}
            />
          </>
        )}
      </div>  
    </div>
  );
};
