import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignUpForm from './register-form';

export default function SignUpPage() {
  return (
    <AuthWrapperFour
      title="Crie sua conta agora mesmo e comece utilizar nossos serviços de graça!"
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapperFour>
  );
}
