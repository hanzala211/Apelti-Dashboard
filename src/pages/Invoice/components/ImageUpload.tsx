import React from 'react';
import { ReactSVG } from 'react-svg';
import { ICONS } from '@constants';

interface ImageUploadProps {
  selectedImage: { value: string; label: string } | string | null;
  handleFile: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedImage: (image: { label: string, value: string } | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  handleFile,
  fileInputRef,
  handleChange,
  setSelectedImage,
}) => {
  return (
    <div className="md:hidden">
      {selectedImage === null ? (
        <div className="py-10 w-full border-b-[1px] flex justify-center">
          <button
            onClick={handleFile}
            className="text-darkBlue font-semibold before:w-36 before:-translate-x-1/2 before:left-1/2 before:absolute relative before:h-1 before:bg-darkBlue before:-bottom-2"
          >
            Browse Folders
          </button>
          <input ref={fileInputRef} onChange={handleChange} type="file" className="hidden" />
        </div>
      ) : (
        <div className="relative w-full border-b-[1px] flex justify-center">
          <button className="absolute right-2 top-2" onClick={() => setSelectedImage(null)}>
            <ReactSVG src={ICONS.close} />
          </button>
          <img
            src={typeof selectedImage === "string" ? selectedImage : selectedImage.value}
            alt={`${typeof selectedImage !== "string" && selectedImage.label} Image`}
            className="w-52 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
