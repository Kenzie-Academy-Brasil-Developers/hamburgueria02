import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  IUserContext,
  IDefaultProviderProps,
  IUser,
  ILoginFormValues,
} from './@types';
import { api } from '../../services/api';
import { TRegisterSchema } from '../../schemas/registerSchema';

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userLoad = async () => {
      const token = localStorage.getItem('@TOKEN');
      const userId = localStorage.getItem('@USERID');

      if (token) {
        try {
          const response = await api.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          navigate('/shop');
          setLoading(false);
        } catch (error) {
          setUser(null);
          localStorage.removeItem('@TOKEN');
          toast.error('Falhou!');
        }
      }
    };

    userLoad();
  }, []);

  const userRegister = async (formData: TRegisterSchema) => {
    try {
      setLoading(true);
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      navigate('/');
      toast.success('Cadastro realizado!');
    } catch (error) {
      toast.error('Cadastro falhou!');
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    try {
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      navigate('/shop');
      toast.success('Login realizado com sucesso!');
      setLoading(true);
    } catch (error) {
      toast.error('E-mail ou senha incorretos, tente novamente!');
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ loading, setLoading, user, userRegister, userLogin, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
