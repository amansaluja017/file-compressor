import { FileUploader } from "../components/index";

function HomePage() {
  return (
    <div className="h-screen text-white bg-base-200">
      <div className="text-center pt-10">
        <h1 className="text-3xl font-bold">Image Resizer</h1>
      </div>
      <FileUploader />
    </div>
  );
}

export default HomePage;
