"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { MoveLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import Palette from "@/components/Palette";
import Spinner from "@/components/Spinner";
import { getBlobByName } from "@/lib/helpers";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export default function Page() {
  const [palettes, setPalettes] = useState<ColorPalette[] | null>(null);
  const [uploads, setUploads] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[], err: FileRejection[]) => {
    if (err && err.length > 0) {
      const rejection =
        err.at(0)?.errors.at(0)?.message ||
        "Only 3 images are allowed at a time or one of your image exceeds 10MB, Try again";
      toast.error(rejection);
    } else {
      acceptedFiles = acceptedFiles.map((file) => {
        const modifiedFile = new File([file], `${uuidv4()}-${file.name}`);
        return modifiedFile;
      });
      setUploads(acceptedFiles);
      handleCreatePalette(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: true,
    maxFiles: 3,
    maxSize: 1e7,
  });

  const handleCreatePalette = async (acceptedFiles: File[]) => {
    try {
      setIsLoading(true);
      const payload = new FormData();
      for (const file of acceptedFiles) {
        payload.append(file.name, file);
      }

      const response = await axios.post(`${API_URI}/upload`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPalettes(response.data);
      setIsLoading(false);
    } catch (e) {
      if ((e as AxiosError).response?.status === 429) {
        toast.error(
          "You have hit rate limit. Please try again after 30 minutes."
        );
      } else {
        toast.error((e as Error).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setPalettes(null);
    setUploads(null);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="mt-12">
      {palettes && palettes.length > 0 ? (
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
          <div className="space-y-8">
            {palettes &&
              palettes.map((p) => (
                <div className="bg-secondary rounded-md" key={p.name}>
                  <Image
                    src={URL.createObjectURL(getBlobByName(p.name, uploads))}
                    alt="preview"
                    width={0}
                    height={0}
                    className="w-full h-[200px] md:h-[300px] object-cover rounded-t-md"
                    priority
                  />
                  <Palette palette={p.palette} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="bg-secondary rounded-md border border-dashed border-gray-400 p-8 flex items-center justify-center text-center cursor-pointer h-[400px]"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image(s) here ...</p>
          ) : (
            <div className="text-lg">
              <p>Drag & drop some image(s) here, or click to select</p>
              <p>Note: Only 3 images are allowed (size &#8804; 10 MB)</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
