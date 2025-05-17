import { AuthButton, CheckInput, ErrorMessage, Input } from "@components";
import { ROUTES } from "@constants";
import { useAuth } from "@context";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm, LoginFormSchema } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useLoginMutation } from "@api";
import { useEffect, useState } from "react";

export const LoginPage: React.FC = () => {
  const { setIsRemember, setUserData, isRemember } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginForm),
  });

  useEffect(() => {
    if (loginMutation.status === "success") {
      setUserData(loginMutation.data.user);
      if (loginMutation.data.token) {
        if (isRemember) {
          localStorage.setItem("token", loginMutation.data.token);
        } else {
          sessionStorage.setItem("token", loginMutation.data.token);
        }
      }
      if (loginMutation.data.user.role === "admin") {
        navigate("/");
      } else if (
        ["approver", "clerk", "accountant", "payer"].includes(
          loginMutation.data.user.role
        )
      ) {
        navigate(`${ROUTES.messages}`);
      }
    } else if (loginMutation.status === "error") {
      setErrorMessage(loginMutation.error?.message || "Login failed");
    }
  }, [loginMutation.status]);

  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  return (
    <div
      className={`lg:w-[30rem] w-[22rem] relative mx-auto h-screen flex flex-col gap-3 ${
        loginMutation.isPending ? "opacity-70" : ""
      } justify-center`}
    >
      {loginMutation.isPending && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <MoonLoader />
        </div>
      )}
      <h1 className="text-[25px] font-semibold">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          error={errors["email"]?.message}
          register={register("email")}
        />
        <Input
          type="password"
          label="Password"
          error={errors["password"]?.message}
          register={register("password")}
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
            onClick={() => navigate(`${ROUTES.auth}/${ROUTES.forgotPassword}`)}
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
            onClick={() => setErrorMessage("")}
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
