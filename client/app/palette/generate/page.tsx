"use client";

import axios from "axios";
import { MoveLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Page() {
  const [palette, setPalette] = useState<Palette[] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleCreatePalette(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    maxSize: 1e7,
  });

  const handleCreatePalette = async (acceptedFiles: File[]) => {
    try {
      const payload = new FormData();
      payload.append("image", acceptedFiles[0]);

      const response = await axios.post(
        "http://localhost:5050/upload",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPalette(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="mt-12">
      {palette ? (
        <div>
          <button
            className="bg-gray-600 px-4 py-2 rounded-md flex items-center gap-3"
            onClick={() => setPalette(null)}
          >
            <MoveLeft />
            Start over
          </button>
          <div className="flex h-[50px] mt-4 w-full">
            {palette.map((color, id) => (
              <div
                key={id}
                className={`flex items-center justify-center text-white flex-auto cursor-pointer`}
                style={{
                  backgroundColor: `rgb(${color.rgb.R},${color.rgb.G},${color.rgb.B})`,
                  width: `${color.percentage}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border border-dashed border-gray-400 p-8 flex items-center justify-center text-center cursor-pointer h-[200px]"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>Drag & drop some images here, or click to select</p>
          )}
        </div>
      )}
    </section>
  );
}
