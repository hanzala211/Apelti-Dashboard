import { AuthButton, CheckInput, ErrorMessage, Input } from '@components';
import { ROUTES } from '@constants';
import { useAuth } from '@context';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginForm, LoginFormSchema } from '@types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export const LoginPage: React.FC = () => {
  const { setIsRemember, login, errorMessage, isAuthLoading, setErrorMessage } =
    useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginForm),
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = (e) => {
    console.log(e);
    login(e);
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
      <h1 className="text-[25px] font-semibold">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          error={errors['email']?.message}
          register={register('email')}
        />
        <Input
          type="password"
          label="Password"
          error={errors['password']?.message}
          register={register('password')}
        />

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <CheckInput
              label="remember"
              handleOnChange={(e) => setIsRemember(e.target.checked)}
            />
            <label htmlFor="remember" className="text-grayTxt text-[14px]">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-basicBlack underline font-medium text-[14px]"
          >
            Forgot Password
          </button>
        </div>
        <ErrorMessage error={errorMessage} />
        <AuthButton text="Sign In" />
        <div>
          <p className="text-[13px] text-grayTxt">
            Here to receive a payment from a Apelti customer?
          </p>
          <Link
            to={`${ROUTES.auth}/${ROUTES.signup}`}
            onClick={() => setErrorMessage('')}
            className="text-[14px] underline font-medium"
          >
            Sign up for Apelti. It's free!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
