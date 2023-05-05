import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../providers/UserContext/UserContext';
import {
  TRegisterSchema,
  registerSchema,
} from '../../../schemas/registerSchema';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { userRegister } = useContext(UserContext);

  const submit: SubmitHandler<TRegisterSchema> = (formData) => {
    userRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='text'
        label='Seu nome'
        register={register('name')}
        error={errors.name}
      />
      <Input
        type='email'
        label='Seu e-mail'
        register={register('email')}
        error={errors.email}
      />
      <Input
        type='password'
        label='Crie uma senha'
        register={register('password')}
        error={errors.password}
      />
      <Input
        type='password'
        label='Confirme a sua senha'
        register={register('confirmPassword')}
        error={errors.confirmPassword}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
