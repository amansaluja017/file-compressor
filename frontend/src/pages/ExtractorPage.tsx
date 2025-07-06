import { Extractor } from "@/components";

function ExtractorPage() {
    return (
    <div className="h-screen text-white bg-base-200">
      <div className="text-center pt-10">
        <h1 className="text-3xl font-bold">Image Extractor</h1>
      </div>
      <Extractor />
    </div>
  );
}

export default ExtractorPage