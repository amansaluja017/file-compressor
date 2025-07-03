import axios from "axios";
import FileSaver from "file-saver";
import fileDownload from "js-file-download";
import { useState } from "react";
import { useForm } from "react-hook-form";

function FileUploader() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (data: Record<string, any>) => {
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      formData.append(
        key,
        key === "file" && data[key]?.[0] ? data[key][0] : data[key]
      );
    });

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/files/imageResize`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        fileDownload(response.data.data, "resize_image")
      }
    } catch (error) {
      console.error("unable to upload file", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center">
      {loading && (
        <div className="absolute h-full w-full flex justify-center backdrop-blur-xs items-center bg-opacity-50 z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <label className="border-dotted px-30 py-10 border-2 cursor-pointer rounded-2xl">
          <input
            type="file"
            className="hidden"
            {...register("file", { required: true })}
          />
          <span>Click to upload file</span>
        </label>

        <button type="submit" className="btn btn-outline btn-primary">
          upload
        </button>
      </form>
    </div>
  );
}

export default FileUploader;
