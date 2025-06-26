function Login() {
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
          <form autoComplete="on">
            <div className="h-full rounded-md flex flex-col gap-1 p-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                autoComplete="email"
                className="input validator rounded-md"
                type="email"
                required
                placeholder="mail@site.com"
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
              />

              <div className="mt-10">
                <button className="btn btn-soft btn-success">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
