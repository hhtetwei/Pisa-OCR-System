import { forwardRef, type ComponentProps } from "react";

import usersActive from '../../assets/users_active.svg?react';
import usersInactive from '../../assets/users_inactive.svg?react';
import reportActive from '../../assets/report_active.svg?react';
import reportInactive from '../../assets/report_inactive.svg?react';
import manageActive from '../../assets/manage_active.svg?react';
import manageInactive from '../../assets/manage_inactive.svg?react';
import homeActive from '../../assets/home_active.svg?react';
import homeInactive from '../../assets/home_inactive.svg?react';
import csvExportActive from '../../assets/export-csv-active.svg?react';
import csvExportInactive from '../../assets/export-csv-inactive.svg?react';

const icons = {
  usersActive,
  usersInactive,
  reportActive,
  reportInactive,
  manageActive,
  manageInactive,
  homeActive,
  homeInactive,
  csvExportActive,
  csvExportInactive,
  export: csvExportActive,

};

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
} & ComponentProps<'svg'>;

export const Icon = forwardRef<SVGSVGElement, Props>(({ name, ...props }, ref) => {
  const Component = icons[name];
  return <Component {...props} ref={ref} />;
});
