import { AuthButton, ErrorMessage, Input } from "@components";
import { useAuth } from "@context";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchema } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";

export const ResetPasswordPage: React.FC = () => {
  const { errorMessage, isAuthLoading, resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (e) => {
    console.log(e);
    resetPassword(e)
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
      <h1 className="text-[25px] font-semibold">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          error={errors['email']?.message}
          register={register('email')}
        />
        <Input
          type="text"
          label="Code"
          error={errors['forgotPasswordCode']?.message}
          register={register('forgotPasswordCode')}
        />
        <Input
          type="password"
          label="New Password"
          error={errors['newPassword']?.message}
          register={register('newPassword')}
        />
        <ErrorMessage error={errorMessage} />
        <AuthButton text="Reset Password" />
      </form>
    </div>
  );
}

export default ResetPasswordPage