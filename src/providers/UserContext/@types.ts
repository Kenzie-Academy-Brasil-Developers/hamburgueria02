import { TLoginSchema } from '../../schemas/loginSchema';
import { TRegisterSchema } from '../../schemas/registerSchema';

export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IUserContext {
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  user: IUser | null;
  userRegister: (registerData: TRegisterSchema) => Promise<void>;
  userLogin: (formData: TLoginSchema) => Promise<void>;
  userLogout: () => void;
}
