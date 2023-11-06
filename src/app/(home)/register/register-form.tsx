'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { SubmitHandler } from 'react-hook-form';
import { Title, Text } from '@/components/ui/text';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useState } from 'react';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';
import http from '@/components/HTTP';
import { useRouter } from 'next/navigation'

const initialValues = {
  email: '',
  name: '',
  phone: '',
  password: '',
  // isAgreed: false,
};

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'Email valido' }),
  name: z.string().min(1, { message: 'Coloque seu nome' }),
  phone: z.string().min(11, { message: 'Número no formaro 19 981859845' }),

  password: z
    .string()
    .min(6, { message: 'Password must be 8 or more characters long' })
    .max(128, { message: 'Password must be a maximum of 32 characters long' }),
    // .regex(new RegExp('.*[A-Z].*'), {
    //   message: 'At least one uppercase character',
    // })
    // .regex(new RegExp('.*[a-z].*'), {
    //   message: 'At least one lowercase character',
    // })
    // .regex(new RegExp('.*\\d.*'), { message: 'At least one number' }),
  // isAgreed: z.boolean(),
});

type FormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [errors, setErros] = useState<any>();
  const router = useRouter()


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // sessionStorage.removeItem('rotafood_access_token')
    // sessionStorage.removeItem('rotafood_refresh_token')

    http.post('accounts/register/', data)
      .then((response) => {
        sessionStorage.setItem('rotafood_access_token', response.data.access_token);
        sessionStorage.setItem('rotafood_refresh_token', response.data.refresh_token);
        setReset({ ...initialValues});
        router.push('/maintenance');
      })
      .catch((error) => {
        setErros(error)
      })

  };

  return (
    <>
      <Form<FormValues>
        validationSchema={signUpFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Seu email aqui!"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Nome"
              placeholder="Seu nome aqui!"
              className="[&>label>span]:font-medium"
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Telefone"
              placeholder="Seu telefone aqui!"
              className="[&>label>span]:font-medium"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Password
              label="Senha"
              placeholder="Sua senha aqui!"
              size={isMedium ? 'lg' : 'xl'}
              {...register('password')}
              className="[&>label>span]:font-medium"
              error={errors.password?.message}
            />
            <div className="col-span-2 flex items-start text-gray-700">
              {/* <Checkbox
                {...register('isAgreed')}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" className="ps-1 text-gray-500">
                    Aceito noosos 
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                       termos 
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                     política de privacidade
                    </Link>
                  </Text>
                }
              /> */}
            </div>
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Criar
            </Button>
          </div>
        )}
      </Form>
      <div>
      {errors && 
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro no Email: </strong>
          <span className="block sm:inline">Email já cadastrado :/</span>
        </div>
      }
      </div>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Já tem uma conta?
        <Link
          href={routes.auth.signIn4}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Entre aqui!
        </Link>
      </Text>
    </>
  );
}
