import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const { register, handleSubmit } = useForm();

  const submit = async (data: any) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        {
          withCredentials: true,
        }
      );

      if(response.status === 200)  {
        console.log(response.data.data)
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="p-8">
        <h1 className="font-bold text-3xl">
          Welcome back, good to see you again
        </h1>
        <div className="h-full w-full rounded-md shadow-2xl mt-8 p-4">
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <form onSubmit={handleSubmit(submit)} autoComplete="on">
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
                min="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                {...register("password", {
                  required: "Password is required",
                })}
              />

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
