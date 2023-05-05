import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z
      .string()
      .min(1, 'O e-mail é obrigatório')
      .email('Forneça um e-mail válido.'),
    password: z
      .string()
      .min(7, 'A senha precisa conter pelo menos 7 caracteres.')
      .regex(/(?=.*?[A-Z])/, 'É necessário pelo menos 1 letra maiúscula.')
      .regex(/(?=.*?[a-z])/, 'É necessário pelo menos 1 letra minúscula.')
      .regex(/(?=.*?[0-9])/, 'É necessário pelo menos 1 número')
      .regex(
        /(?=.?[`!@#$%^&()_+\-=[\]{};':"\\|,.<>/?~*])/,
        'Pelo menos um carácter especial'
      ),
    confirmPassword: z.string().min(1, 'Confirmar a senha é obrigatório.'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
