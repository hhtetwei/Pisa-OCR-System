
import type { NotificationProps } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';


type NotificationPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

type Options = {
  title?: string;
  message: ReactNode;
  className?: string;
  loading?: boolean;
  color?: string;
  onOpen?: () => void;
  onClose?: () => void;
  autoCloseAfter?: number;
  withCloseButton?: boolean;
  id?: string;
  icon?: NotificationProps['icon'];
  position?: NotificationPosition;
};

const defaultOpts: Partial<Options> = {
  withCloseButton: true,
  position: 'top-right',
};

export const toast = {
  show(opt: Options) {
    notifications.show({ ...defaultOpts, ...opt });
  },
  success(opt: Options) {
    this.show({
      color: 'green',
      ...opt,
    });
  },
  error(opt: Options) {
    this.show({
      color: 'red',
      ...opt,
    });
  },
};
