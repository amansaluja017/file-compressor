import { BackgroundChange } from "@/components";

function BackgroundChangePage() {
    return (
    <div className="h-screen text-white bg-base-200">
      <div className="text-center pt-10">
        <h1 className="text-3xl font-bold">Background Changer</h1>
      </div>
      <BackgroundChange />
    </div>
  );
}

export default BackgroundChangePage