import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/Slice";
import { useNavigate } from "react-router";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        {
          withCredentials: true,
        }
      );

      if(response.status === 200)  {
        console.log(response.data.data)
        dispatch(login(response.data.data));
        navigate("/home");
      }
    } catch (error: any) {
      if(error.status === 404) {
        setError("Please enter a register email")
      } else if (error.status === 401) {
        setError("Password is incorrect")
      } else {
        setError("Internal server error, please try again after some time")
      }
      console.error("Login failed:", error);
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
      <div className="p-8">
        <h1 className="font-bold text-3xl">
          Welcome back, good to see you again
        </h1>
        <div className="h-full w-full rounded-md shadow-2xl mt-8 p-4">
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <form onChange={(e) => {
            e.preventDefault();
            setError("");
          }} onSubmit={handleSubmit(submit)} autoComplete="on">
            <div className="h-full rounded-md flex flex-col gap-1 p-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                autoComplete="email"
                className="input validator rounded-md"
                type="email"
                required
                placeholder="mail@site.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
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
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <p className="text-red-500 text-sm font-serif mt-2">{error}</p>

              <div className="mt-10">
                <button type="submit" className="btn btn-soft btn-success">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
