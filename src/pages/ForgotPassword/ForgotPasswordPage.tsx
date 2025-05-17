import { AuthButton, ErrorMessage, Input } from "@components";
import { ROUTES } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, forgotPasswordSchema } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useForgotPasswordMutation } from "@api";
import { useEffect, useState } from "react";
import { toast } from "@helpers";

export const ForgotPasswordPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (forgotPasswordMutation.status === "success") {
      navigate(`${ROUTES.auth}/${ROUTES.reset}`);
      toast.success(
        "All set!",
        "A link to reset your password is on its way to your inbox."
      );
    } else if (forgotPasswordMutation.status === "error") {
      setErrorMessage(
        forgotPasswordMutation.error?.message || "Request failed"
      );
    }
  }, [forgotPasswordMutation.status]);

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (data) => {
    console.log(data);
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div
      className={`lg:w-[30rem] w-[22rem] relative mx-auto h-screen flex flex-col gap-3 ${
        forgotPasswordMutation.isPending ? "opacity-70" : ""
      } justify-center`}
    >
      {forgotPasswordMutation.isPending && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <MoonLoader />
        </div>
      )}
      <h1 className="text-[25px] font-semibold">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          error={errors["email"]?.message}
          register={register("email")}
        />
        <ErrorMessage error={errorMessage} />
        <AuthButton
          text="Send Code"
          isAuthLoading={forgotPasswordMutation.isPending}
        />
        <div>
          <p className="text-[13px] text-grayTxt">Remembered it?</p>
          <Link
            to={`${ROUTES.auth}/${ROUTES.login}`}
            onClick={() => setErrorMessage("")}
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
