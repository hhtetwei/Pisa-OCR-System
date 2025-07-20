import type { User } from "../user/types";


export type AuthContext = {
  user: User | null;
  onLogin: (value: { data: User; token: string }) => void;
  onLogout: () => void;
  isLoadingUser: boolean;
  onUpdateUser: (data: User) => void;
};

export type AuthState = {
  user: User | null;
  isLoadingUser: boolean;
};

export type AuthAction =
  | {
      type: 'LOGGED_IN';
      payload: User;
    }
  | {
      type: 'LOADED_USER';
      payload: User;
    }
  | {
      type: 'UNSET_USER';
    }
  | {
      type: 'LOGGED_OUT';
    };
