import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserContext } from '../../../providers/UserContext/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { TLoginSchema, loginSchema } from '../../../schemas/loginSchema';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { userLogin } = useContext(UserContext);

  const submit: SubmitHandler<TLoginSchema> = (formData) => {
    userLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Seu e-mail'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        label='Sua senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
