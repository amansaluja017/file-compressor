import { ForgetPassword } from "../components/index";

function ForgetPasswordPage() {
  return (
    <div className="h-screen flex items-center justify-center text-white bg-base-200">
      <div className="h-full w-1/2">
        <ForgetPassword />
      </div>
      <div className="h-full w-1/2">
        <div className="bg-[url(/public/image1.jpg)] h-full bg-cover">
          <div className="h-full w-full flex justify-center items-center">
            <h1 className="font-bold text-6xl">Image Modifier</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
