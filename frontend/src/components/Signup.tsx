import {useForm} from "react-hook-form"
import axios from "axios";

function Signup() {
  const {register, handleSubmit} = useForm();

   const submit = async (data: any) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response);

      if(response.status === 201)  {
        console.log(response.data.data)
      }
    } catch (error) {
      console.error("signup failed:", error);
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
            <h1 className="text-2xl font-bold">Signup</h1>
          </div>
          <form onSubmit={handleSubmit(submit)} autoComplete="on">
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
                  required: true
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
                  required: true
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
                  required: true
                })}
              />
              <p className="validator-hint">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>

              <div className="">
                <button type="submit" className="btn btn-soft btn-success">signup</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
