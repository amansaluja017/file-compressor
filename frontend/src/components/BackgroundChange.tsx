import axios from "axios";
import FileSaver from "file-saver";
import { useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

function BackgroundChange() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [oldUrl, setOldurl] = useState<string>("");
  const [extractItems, setExtactItems] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (data: Record<string, any>) => {
    console.log("form data", data);
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
        `${import.meta.env.VITE_BASE_URL}/files/backgroundChanger`,
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

  const handleFileChange = (e: FormEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files;

    if (file && file[0].type.startsWith("image/") === false) {
      alert("Please upload jpg, jpeg, png file.");
      return;
    }

    if (file) {
      const fileUrl = URL.createObjectURL(file[0]);
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
          className="flex flex-col items-center">
          {oldUrl ? (
            <img className="h-20 w-20" src={oldUrl} alt="uploaded image" />
          ) : (
            <label
              onChange={handleFileChange}
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
            <div>
              <div
                onChange={(e) => {
                  const value = e.target as HTMLInputElement;
                  setExtactItems(value.value);
                }}>
                <label htmlFor="extract">Prompt</label>
                <textarea
                  id="extract"
                  placeholder="eg: Minimalist background with a soft pastel gradient even lighting"
                  value={extractItems}
                  className="textarea textarea-accent"
                  {...register("prompt", { required: true })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Change background
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BackgroundChange;
