"use client";

import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MagicSpinner } from "react-spinners-kit";
import { MoveLeft } from "lucide-react";

import Palette from "@/components/Palette";

export default function Page() {
  const [palette, setPalette] = useState<Palette[] | null>(null);
  const [uploads, setUploads] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploads(acceptedFiles);
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
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setPalette(null);
    setUploads(null);
  };

  return isLoading ? (
    <div className="h-[500px] flex flex-col items-center justify-center gap-4">
      <MagicSpinner />
      <p className="text-lg">Generating Palettes</p>
    </div>
  ) : (
    <section className="mt-12">
      {palette ? (
        <div className="space-y-4">
          <button
            className="bg-gray-600 px-4 py-2 rounded-md flex items-center gap-3"
            onClick={() => {
              clear();
            }}
          >
            <MoveLeft />
            Try with different images
          </button>
          <p>Click on any color to view more details.</p>
          <div className="bg-secondary rounded-md">
            <Image
              src={URL.createObjectURL(uploads![0])}
              alt="preview"
              width={0}
              height={0}
              className="w-full h-[200px] md:h-[300px] object-cover rounded-t-md"
              priority
            />
            <Palette palette={palette} />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p>Upload image(s) below to start creating color palettes.</p>
          <div
            {...getRootProps()}
            className="bg-secondary rounded-md border border-dashed border-gray-400 p-8 flex items-center justify-center text-center cursor-pointer h-[400px]"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image(s) here ...</p>
            ) : (
              <p>Drag & drop some image(s) here, or click to select</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
