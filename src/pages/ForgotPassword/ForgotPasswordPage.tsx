import { AuthButton, ErrorMessage, Input } from '@components';
import { ROUTES } from '@constants';
import { useAuth } from '@context';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, forgotPasswordSchema } from '@types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export const ForgotPasswordPage: React.FC = () => {
  const { errorMessage, isAuthLoading, setErrorMessage, forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (e) => {
    console.log(e);
    forgotPassword(e)
  };

  return (
    <div
      className={`lg:w-[30rem] w-[22rem] relative mx-auto h-screen flex flex-col gap-3 ${isAuthLoading ? 'opacity-70' : ''
        } justify-center`}
    >
      {isAuthLoading && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <MoonLoader />
        </div>
      )}
      <h1 className="text-[25px] font-semibold">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          error={errors['email']?.message}
          register={register('email')}
        />
        <ErrorMessage error={errorMessage} />
        <AuthButton text="Send Code" />
        <div>
          <p className="text-[13px] text-grayTxt">Remembered it?</p>
          <Link
            to={`${ROUTES.auth}/${ROUTES.login}`}
            onClick={() => setErrorMessage('')}
            className="text-[14px] underline font-medium"
          >
            Log in here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
