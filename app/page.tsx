"use client";

import { useActionState } from "react";
import { useState } from "react";
import sendDataAction, { State } from "./action";
import Image from "next/image";

export default function Home() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    sendDataAction,
    null
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages(Array.from(event.target.files));
    }
  };

  const handleImageRemove = (index: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action={formAction}
        className="bg-white shadow-md rounded-lg p-8 space-y-6 w-full max-w-md"
      >
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-800 mb-2">
              Selected Images
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-24 bg-gray-100 rounded overflow-hidden border border-gray-200"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Selected image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          disabled={pending}
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white ${
            pending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          }`}
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
        <div className="text-sm text-gray-500 mt-4">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </form>
    </div>
  );
}
