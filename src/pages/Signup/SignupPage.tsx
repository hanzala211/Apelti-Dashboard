import { AuthButton, ErrorMessage, Input, PhoneNumberInput } from "@components";
import { ROUTES } from "@constants";
import { useAuth } from "@context";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupForm, SignupFormSchema } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useSignupMutation } from "@api";
import { useEffect, useState } from "react";

export const SignupPage: React.FC = () => {
  const { setUserData } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const signupMutation = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupForm),
    defaultValues: {
      businessType: "Small or midsize business",
    },
  });

  useEffect(() => {
    if (signupMutation.status === "success") {
      setUserData(signupMutation.data.user);

      if (signupMutation.data.token) {
        localStorage.setItem("token", signupMutation.data.token);
      }

      if (signupMutation.data.user.role === "admin") {
        navigate("/");
      } else if (
        ["approver", "clerk", "accountant", "payer"].includes(
          signupMutation.data.user.role
        )
      ) {
        navigate(`${ROUTES.messages}`);
      }
    } else if (signupMutation.status === "error") {
      setErrorMessage(signupMutation.error?.message || "Signup failed");
    }
  }, [signupMutation.status]);

  const onSubmit: SubmitHandler<SignupFormSchema> = (data) => {
    console.log(data);
    signupMutation.mutate(data);
  };

  return (
    <div
      className={`w-[22rem] lg:w-[35rem] relative mx-auto h-screen flex flex-col gap-3 justify-center ${
        signupMutation.isPending ? "opacity-70" : ""
      } `}
    >
      {signupMutation.isPending && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <MoonLoader />
        </div>
      )}
      <h1 className="text-[25px] font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex gap-5">
          <Input
            register={register("firstName")}
            label="First Name"
            type="string"
            error={errors["firstName"]?.message}
          />
          <Input
            register={register("lastName")}
            label="Last Name"
            type="string"
            error={errors["lastName"]?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            register={register("email")}
            label="Email"
            type="string"
            error={errors["email"]?.message}
          />
          <PhoneNumberInput label="Phone" name="phone" control={control} />
        </div>
        <div className="flex gap-5">
          <Input
            register={register("companyName")}
            label="Company Name"
            type="string"
            error={errors["companyName"]?.message}
          />
          <Input
            register={register("numberOfEmployees", { valueAsNumber: true })}
            label="Number of Employes"
            type="number"
            error={errors["numberOfEmployees"]?.message}
          />
        </div>
        <div className="w-full">
          <Input
            register={register("password")}
            label="Password"
            type="password"
            error={errors["password"]?.message}
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">I'm with a:</h3>
          <div className="space-x-1.5">
            <input
              type="radio"
              id="small"
              className="accent-black"
              value="Small or midsize business"
              {...register("businessType")}
            />
            <label htmlFor="small" className="text-grayTxt text-[14px]">
              Small or midsize business
            </label>
          </div>
          <div className="space-x-1.5">
            <input
              type="radio"
              id="firm"
              className="accent-black"
              value="Accounting Firm"
              {...register("businessType")}
            />
            <label htmlFor="firm" className="text-grayTxt text-[14px]">
              Accounting Firm
            </label>
          </div>
        </div>
        <ErrorMessage error={errorMessage} />
        <AuthButton text="Sign Up" isAuthLoading={signupMutation.isPending} />
        <div className="flex gap-3 items-baseline">
          <p className="text-[13px] m-0 text-grayTxt">
            Already have an account
          </p>
          <Link
            to={`${ROUTES.auth}/${ROUTES.login}`}
            onClick={() => setErrorMessage("")}
            className="text-[14px] underline font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
