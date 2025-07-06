import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../store/Slice";
import { Link, useNavigate } from "react-router";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const acceptRef = useRef<HTMLInputElement | null>(null);
  console.log(acceptRef.current?.checked);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data: any) => {
    try {
      if (!acceptRef.current?.checked) {
        setError("accept all terms and conditions");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log(response.data.data);
        dispatch(signup(response.data.data));
        navigate("/home");
      }
    } catch (error: any) {
      if (error.status === 402) {
        setError(
          "This email is already exists, please login or try different one"
        );
      } else {
        setError("Internal server error, please try again some time");
      }
      console.error("signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      {loading && (
        <div className="absolute h-full w-1/2 flex justify-center backdrop-blur-xs items-center bg-opacity-50 z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}
      <div className="p-8 w-full">
        <h1 className="font-bold text-3xl">
          Hello
        </h1>
        <div className="h-full w-full rounded-md shadow-2xl mt-8 p-4">
          <div>
            <h1 className="text-2xl font-bold">Signup</h1>
          </div>
          <form
            onChange={(e) => {
              e.preventDefault();
              setError("");
            }}
            onSubmit={handleSubmit(submit)}
            autoComplete="on">
            <div className="h-full rounded-md flex flex-col gap-1 p-4">
              <label htmlFor="email">Name</label>
              <input
                id="name"
                autoComplete="name"
                className="input validator rounded-md"
                type="text"
                required
                placeholder="John doe"
                {...register("name", {
                  required: true,
                })}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                autoComplete="email"
                className="input validator rounded-md"
                type="email"
                required
                placeholder="mail@site.com"
                {...register("email", {
                  required: true,
                })}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                autoComplete="current-password"
                type="password"
                className="input validator rounded-md"
                required
                placeholder="Password"
                min="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                {...register("password", {
                  required: true,
                })}
              />
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>

              <div className="flex gap-2 mt-2 items-center">
                <input
                  ref={acceptRef}
                  type="checkbox"
                  className="checkbox size-4"
                />
                <p className="text-xs hover:underline">
                  Accept all terms and conditions
                </p>
              </div>

              <p className="text-sm text-red-500 mb-2 font-serif">{error}</p>

              <div className="mt-4">
                <button type="submit" className="btn btn-soft btn-success">
                  signup
                </button>
              </div>
            </div>
          </form>

          <div className="text-sm">
            <p>
              Already have a account?{" "}
              <Link
                to="/login"
                className="text-blue-500 cursor-pointer hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
