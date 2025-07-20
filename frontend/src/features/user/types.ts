export const UserType = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
  } as const;
  
export type UserType = (typeof UserType)[keyof typeof UserType];
  
export const AccountStatus = {
    OFFLINE : 'Offline',
    ONLINE :'Online',
}as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];
  
export type User = {
    surname: string;
    password: string | undefined;
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    accountStatus: AccountStatus;
    type: UserType;
};
  

  