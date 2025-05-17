import { AuthButton, ErrorMessage, Input } from "@components";
import { ROUTES } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchema } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useResetPasswordMutation } from "@api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@helpers";

export const ResetPasswordPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const resetPasswordMutation = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (resetPasswordMutation.status === "success") {
      navigate(`${ROUTES.auth}/${ROUTES.login}`);
      toast.success(
        "Password Updated!",
        "Your password has been changed successfully."
      );
    } else if (resetPasswordMutation.status === "error") {
      setErrorMessage(resetPasswordMutation.error?.message || "Reset failed");
    }
  }, [resetPasswordMutation.status]);

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    console.log(data);
    resetPasswordMutation.mutate(data);
  };

  return (
    <div
      className={`lg:w-[30rem] w-[22rem] relative mx-auto h-screen flex flex-col gap-3 ${resetPasswordMutation.isPending ? 'opacity-70' : ''
        } justify-center`}
    >
      {resetPasswordMutation.isPending && (
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
