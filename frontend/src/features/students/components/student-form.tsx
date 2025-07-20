
import { toast } from '@/libs/mantine-toast';
import { useQueryClient } from '@tanstack/react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import {  useForm } from 'react-hook-form';
import {  useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { PasswordInput } from '@/components/ui/password-input';
import { Students } from '../types';
import { CreateStudentDto, createStudentSchema } from '../schemas';
import { useCreateStudent } from '../api/create-student';
import { useEditStudent } from '../api/edit-student';


export const StudentForm = ({
  isOpen,
  close,
  oldData,
}: {
  isOpen: boolean;
  close: () => void;
  oldData?: Students;
}) => {
  const { t } = useTranslation();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentDto>({
    resolver: zodResolver(createStudentSchema(t)),
  });

  const { mutate: createTeacher, isPending: isCreateLoading } = useCreateStudent();
  const { mutate: editTeacher, isPending: isEditLoading } = useEditStudent();

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    const payload = {
      ...data.user,       
      parentEmail: data.parentEmail,
      type: 'student',
    };
  
    if (oldData) {
      editTeacher(
        { id: oldData.id, data: payload },  
        {
          onSuccess: () => {
            toast.success({
              title: t('Success!'),
              message: t('Edited Student'),
            });
            queryClient.invalidateQueries({ queryKey: ['students'] });
            close();
          },
        }
      );
    } else {
      createTeacher(payload, {
        onSuccess: () => {
          toast.success({
            title: t('Success!'),
            message: t('Added Student'),
          });
          queryClient.invalidateQueries({ queryKey: ['students'] });
          close();
        },
      });
    }
  });
  
  

  useEffect(() => {
    if (isOpen) {
      if (oldData && oldData.user) {
        
        reset({
          parentEmail: oldData.parentEmail || '',
          user: {
            
            name: oldData.user.name,
            surname: oldData.user.surname,
            phoneNumber: oldData.user.phoneNumber,
            email: oldData.user.email,
            password: '',
          },
        });
      } else {
        reset({
          parentEmail: '',
          user: {
            name: '',
            surname: '',
            phoneNumber: '',
            email: '',
            password: '',
          },
        });
      }
    }
  }, [isOpen, oldData, reset]);
  


  return (
    <Modal
      title={`${oldData ? t('Edit') : t('Add')} ${t('Student')}`}
      isOpen={isOpen}
      renderActionButton={() => (
        <Button
          type="submit"
          form="student-form"
          loading={oldData ? isEditLoading : isCreateLoading}
        >
          {t('Save')}
        </Button>
      )}
      onClose={close}
      size="lg"
    >
      <form onSubmit={onSubmit} id="student-form" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
         
        <TextInput
          withAsterisk
          label={t('Name')}
          placeholder={t('Enter Student Name')}
          registration={register('user.name')}
          error={errors.user?.name?.message}
        />
        <TextInput
          withAsterisk
          label={t('Surname')}
          placeholder={t('Enter Student Surname')}
          registration={register('user.surname')}
          error={errors.user?.surname?.message}
        />
        <TextInput
          withAsterisk
          label={t('Phone Number')}
          placeholder={t('Enter Student Phone Number')}
          registration={register('user.phoneNumber')}
          error={errors.user?.phoneNumber?.message}
        />
        <TextInput
          withAsterisk
          label={t('Email')}
          placeholder={t('Enter Student Email')}
          registration={register('user.email')}
          error={errors.user?.email?.message}
          type="email"
        />
        
          <PasswordInput
            label={t('Password')}
            placeholder={t('Enter password')}
            registration={register('user.password')}
            error={errors.user?.password?.message}
          />

        <TextInput
          withAsterisk
          label={t('Parent Email')}
          placeholder={t('Enter Parent Email')}
          registration={register('parentEmail')}
          error={errors.parentEmail?.message}
          type="email"
        />
    
        </div>
      </form>
    </Modal>
  );
};
