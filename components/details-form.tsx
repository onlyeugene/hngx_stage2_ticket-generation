"use client";

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas";
import { uploadToCloudinary } from "@/lib/cloudinary";

import uploadIcon from "@/public/upload.svg";
import { LoadingSpinner } from "./loading-spinner";
import { FormData } from "@/types";
import Heading from "./heading";

interface DetailsFormProps {
  onNext: (data: FormData) => void;
}

export interface DetailsFormRef {
  submitForm: () => Promise<boolean>;
}

const DetailsForm = forwardRef<DetailsFormRef, DetailsFormProps>(
  ({ onNext }, ref) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
    });

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        return new Promise<boolean>((resolve) => {
          handleSubmit(
            (data) => {
              const formData = {
                ...data,
                profileImage: selectedImage, // Include the image URL
              };
              localStorage.setItem("ticketData", JSON.stringify(formData));
              onNext(formData);
              resolve(true);
            },
            () => resolve(false)
          )();
        });
      },
    }));

    useEffect(() => {
      const savedData = localStorage.getItem("ticketData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setValue("fullName", parsedData.fullName);
        setValue("email", parsedData.email);
        setValue("about", parsedData.about);
        if (parsedData.profileImage) {
          setSelectedImage(parsedData.profileImage);
        }
      }
    }, [setValue]);

    const handleImageChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setIsUploading(true);
        setUploadError(null);

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result as string);
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file);
        setSelectedImage(cloudinaryUrl);

        // Set the avatar field in the form data
        setValue("profileImage", cloudinaryUrl);

        // Update localStorage
        const savedData = localStorage.getItem("ticketData");
        const parsedData = savedData ? JSON.parse(savedData) : {};
        localStorage.setItem(
          "ticketData",
          JSON.stringify({
            ...parsedData,
            profileImage: cloudinaryUrl,
            avatar: cloudinaryUrl, // Ensure avatar is also saved
          })
        );
      } catch (error) {
        setUploadError("Failed to upload image. Please try again.");
        // console.error("Error uploading image:", error);
        return error;
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="text-white py-5">
        <Heading title="Attendee Details" subtitle="Step 2/3" />
        <div className="w-full bg-primary rounded-full mt-5 h-2">
          <div
            className="h-2 bg-lighter rounded-full transition-all"
            style={{ width: "66%" }}
          />
        </div>

        <div className="border border-primary mt-5 p-5 rounded-3xl bg-[#08252b]">
          <div className="flex flex-col border border-primary rounded-3xl p-5 py-10 bg-gradient-to-r from-primary/90 via-darker to-darker">
            <h1 className="mb-5 text-lg font-semibold">Upload Profile Photo</h1>

            <div className="border border-secondary bg-darker w-full h-60 flex items-center justify-center">
              <label
                htmlFor="file-upload"
                className="relative flex flex-col items-center justify-center w-80 h-60 border-2 border-primary rounded-3xl cursor-pointer transition hover:bg-[#0a343c]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Uploaded"
                    width={300}
                    height={300}
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                  />
                )}

                {(!selectedImage || isHovered) && (
                  <div className="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center rounded-3xl">
                    {isUploading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <Image
                          src={uploadIcon}
                          alt="Upload"
                          className="w-10 h-10"
                        />
                        <span className="text-sm text-white text-center">
                          Drag & Drop or click to upload
                        </span>
                      </>
                    )}
                  </div>
                )}

                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            {uploadError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {uploadError}
              </p>
            )}
            {errors.profileImage && (
              <p className="text-red-500 text-xs mt-1">
                {'Upload an image to proceed'}
              </p>
            )}
          </div>

          <div className="border-b border-2 border-primary mt-5" />

          <form className="mt-5">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                className="w-full px-4 py-2 bg-darker border focus-within:border-lighter border-primary rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {'Required Field'}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 focus-within:border-lighter bg-darker border border-primary rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {'Email is required'}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                About the Project
              </label>
              <textarea
                {...register("about")}
                className="w-full px-4 py-2 bg-darker border focus-within:border-lighter border-primary rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                rows={4}
              />
              {errors.about && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.about.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

DetailsForm.displayName = "DetailsForm";

export default DetailsForm;
