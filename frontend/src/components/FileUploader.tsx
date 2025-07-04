import axios from "axios";
import FileSaver from "file-saver";
import { useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

function FileUploader() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [oldUrl, setOldurl] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

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
        console.log(response.data.data);
        setUrl(response.data.data);
      }
    } catch (error) {
      console.error("unable to upload file", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const file = target.value;

    if (file) {
      const fileUrl = URL.createObjectURL(
        (target as HTMLInputElement).files![0]
      );
      setOldurl(fileUrl);
    } else {
      setOldurl("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setOldurl(URL.createObjectURL(file));
      // Set file in input for react-hook-form
      if (formRef.current) {
        const input = formRef.current.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {loading && (
        <div className="absolute h-full w-full flex justify-center backdrop-blur-xs items-center bg-opacity-50 z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}

      {url ? (
        <div className="flex items-center justify-center gap-4">
          <div className="h-[20rem] w-[20rem] flex items-center justify-center flex-col bg-cover">
            <img src={url} alt="resized image" />
          </div>
          <button
            className="btn btn-outline btn-success"
            onClick={async () => {
              try {
                const response = await axios.get(url, {
                  responseType: "blob",
                });
                FileSaver.saveAs(response.data, "downloaded-file");
              } catch (err) {
                console.error("Download failed", err);
              }
            }}>
            Download
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          ref={formRef}
          onChange={handleFileChange}
          className="flex flex-col items-center">
          {oldUrl ? (
            <img className="h-20 w-20" src={oldUrl} alt="uploaded image" />
          ) : (
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-dotted px-30 py-10 border-2 cursor-pointer rounded-2xl">
              <input
                type="file"
                className="hidden"
                {...register("file", { required: true })}
              />
              <span>Click or drag and drop to upload file</span>
            </label>
          )}

          <div className="flex flex-col gap-4 mt-20">
            <label>
              Width:
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                {...register("width", { required: true })}
                defaultValue={1000}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                {...register("height", { required: true })}
                defaultValue={1000}
              />
            </label>
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Resize Image
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FileUploader;
