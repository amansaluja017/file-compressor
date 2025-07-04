import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePassword } from "../store/Slice";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router";

function ForgetPassword() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<number>();
  const [otpPanel, setOtpPanel] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [userOtp, setUserotp] = useState<number>();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const newPasswordRef = useRef<HTMLDivElement>(null);
  const confirmPasswordRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  console.log(emailRef);

  const verify = async (data: string) => {
    console.log("verify", data);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/get-otp`,
        { email: data },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data.data.otp);
        setOtp(Number(response.data.data.otp));
        setOtpPanel(true);
      }
    } catch (error: any) {
      console.error(error);
      if (error.status === 404) {
        setError("user not found");
      } else {
        setError("Internal error, please try again after some time");
      }
    } finally {
      setLoading(false);
    }
  };

  const submit = async (data: any) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/update-password`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data)
        dispatch(updatePassword(response.data.data));
        navigate("/login")
      }
    } catch (error: any) {
      console.error(error);
      if (error.status === 404) {
        setError("Please enter new and confirm password");
      } else if (error.status === 401) {
        setError("new and confirm password should be same");
      } else {
        setError("Internal server error, please try again after some time");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputEmail = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError("");
    const value = e.target as HTMLInputElement;
    setValue(value.value);
  };

  const inputOtp = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError("");
    const value = e.target as HTMLInputElement;
    const enteredOtp = Number(value.value);
    setUserotp(enteredOtp);
  };

  const verifyOtp = () => {
    if (userOtp === otp) {
      setOtpPanel(false);
      newPasswordRef.current?.children?.[1].removeAttribute("disabled");
      confirmPasswordRef.current?.children?.[1].removeAttribute("disabled");
      emailRef.current?.setAttribute("disabled", "true");
    } else {
      setError("invalid otp");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      {loading && (
        <div className="absolute h-full w-1/2 flex justify-center backdrop-blur-xs items-center bg-opacity-50 z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}

      {otpPanel && (
        <div className="absolute z-50 backdrop-blur-xs h-full w-1/2 flex flex-col justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
            <p className="text-sm text-gray-500 mb-4">
              Please enter the OTP sent to your email.
            </p>
          </div>
          <div onChange={inputOtp}>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div>
            <button
              onClick={verifyOtp}
              className="btn btn-outline btn-success mt-5">
              verify
            </button>
          </div>
        </div>
      )}
      <div className="p-8 w-full">
        <h1 className="font-bold text-3xl"></h1>
        <div className="h-full w-full rounded-md shadow-2xl mt-8 p-4">
          <div>
            <h1 className="text-2xl font-bold">Forget Password</h1>
          </div>
          <form
            onChange={(e) => {
              e.preventDefault();
              setError("");
            }}
            onSubmit={handleSubmit(submit)}
            autoComplete="on">
            <div className="h-full rounded-md flex flex-col gap-1 p-4">
              <div
                ref={emailRef}
                onChange={inputEmail}
                className="flex flex-col gap-1">
                <label
                  className="flex items-center justify-between w-1/2"
                  htmlFor="email">
                  Email{" "}
                  <span
                    onClick={() => verify(value)}
                    className="text-sm text-red-500 hover:text-red-300 cursor-pointer">
                    verify
                  </span>
                </label>
                <input
                  id="email"
                  autoComplete="email"
                  className="input validator rounded-md"
                  type="email"
                  required
                  placeholder="mail@site.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div ref={newPasswordRef} className="flex flex-col gap-1 mt-2">
                <label htmlFor="new-password">New Password</label>
                <input
                  id="new-password"
                  autoComplete="current-password"
                  type="password"
                  className="input validator rounded-md"
                  required
                  placeholder="Password"
                  disabled
                  {...register("newPassword", {
                    required: "Password is required",
                  })}
                />
              </div>

              <div
                ref={confirmPasswordRef}
                className="flex flex-col gap-1 mt-2">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  autoComplete="current-password"
                  type="password"
                  className="input validator rounded-md"
                  required
                  placeholder="Confirm Password"
                  disabled
                  {...register("confirmPassword", {
                    required: "Password is required",
                  })}
                />
              </div>
              <p className="text-red-500 text-sm font-serif mt-2">{error}</p>

              <div className="mt-10">
                <button type="submit" className="btn btn-soft btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
