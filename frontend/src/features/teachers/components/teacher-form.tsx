
import { toast } from '@/libs/mantine-toast';
import { useQueryClient } from '@tanstack/react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import {  useForm } from 'react-hook-form';
import {  useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Teachers } from '../types';
import { CreateTeacherDto, createTeacherSchema } from '../schemas';
import { useCreateTeacher, useEditTeacher } from '../api';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { PasswordInput } from '@/components/ui/password-input';


export const TeacherForm = ({
  isOpen,
  close,
  oldData,
}: {
  isOpen: boolean;
  close: () => void;
  oldData?: Teachers;
}) => {
  const { t } = useTranslation();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTeacherDto>({
    resolver: zodResolver(createTeacherSchema(t)),
  });

  const { mutate: createTeacher, isPending: isCreateLoading } = useCreateTeacher();
  const { mutate: editTeacher, isPending: isEditLoading } = useEditTeacher();

  const queryClient = useQueryClient();

    const onSubmit = handleSubmit((data) => {
      const payload = {
        ...data.user,       
        
      };
    
  
    if (oldData) {
      editTeacher(
        { id: oldData.id, data: payload },
        {
          onSuccess: () => {
            toast.success({
              title: t('Success!'),
              message: t('Edited Teacher'),
            });
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
            close();
           
          },
        }
      );
    } else {
      createTeacher(payload, {
        onSuccess: () => {
          toast.success({
            title: t('Success!'),
            message: t('Added Teacher'),
          });
          queryClient.invalidateQueries({ queryKey: ['teachers'] });
          close();
        
        },
      });
    }
  });
  

  useEffect(() => {
    if (isOpen) {
      if (oldData && oldData.user) {
        reset({
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
      title={`${oldData ? t('Edit') : t('Add')} ${t('Teacher')}`}
      isOpen={isOpen}
      renderActionButton={() => (
        <Button
          type="submit"
          form="teacher-form"
          loading={oldData ? isEditLoading : isCreateLoading}
        >
          {t('Save')}
        </Button>
      )}
      onClose={close}
      size="lg"
    >
      <form onSubmit={onSubmit} id="teacher-form" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
         
        <TextInput
          withAsterisk
          label={t('Name')}
          placeholder={t('Enter Teacher Name')}
          registration={register('user.name')}
          error={errors.user?.name?.message}
        />
        <TextInput
          withAsterisk
          label={t('Surname')}
          placeholder={t('Enter Teacher Surname')}
          registration={register('user.surname')}
          error={errors.user?.surname?.message}
        />
        <TextInput
          withAsterisk
          label={t('Phone Number')}
          placeholder={t('Enter Teacher Phone Number')}
          registration={register('user.phoneNumber')}
          error={errors.user?.phoneNumber?.message}
        />
        <TextInput
          withAsterisk
          label={t('Email')}
          placeholder={t('Enter Teacher Email')}
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
    
        </div>
      </form>
    </Modal>
  );
};
