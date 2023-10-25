import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignInForm from './login-form';

export default function SignInPage() {
  return (
    <AuthWrapperFour
      title={
        <>
          Bem Vindo! <br /> Entre na sua conta e vamos começar!
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
