import { COLORS, ICONS } from '@constants';
import { useInvoice } from '@context';
import { handleFileChange } from '@helpers';
import { useRef, useState } from 'react';
import { CommonLoader } from "@components"
import { v4 as uuidv4 } from 'uuid';

export const MultipleImageUploadModal: React.FC = () => {
  const {
    isMultipleImageUploadOpen,
    setIsMultipleImageUploadOpen,
    extractData,
    setMultipleInvoicesExtractedData,
    setIsMultipleInvoicesModalOpen,
    setSelectedMultipleImages,
  } = useInvoice();
  const [isExtractingData, setIsExtractingData] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (!isExtractingData) {
      setIsMultipleImageUploadOpen(false);
    }
  };

  const handleFileRefClick = () => {
    if (!isExtractingData) fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsExtractingData(true);
      const foundValue = handleFileChange(e, 'images');
      if (Array.isArray(foundValue) && foundValue.length > 0) {
        const extractedData = await Promise.all(
          foundValue.map(async (file) => {
            const result = await extractData(file);
            return {
              ...result,
              _id: uuidv4(),
            };
          })
        );
        if (extractedData.length > 0) {
          setSelectedMultipleImages(foundValue);
          setMultipleInvoicesExtractedData(extractedData);
          setIsMultipleInvoicesModalOpen(true);
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsExtractingData(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div
      className={`${isMultipleImageUploadOpen
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'
        }`}
    >
      <div
        className={`${isMultipleImageUploadOpen ? 'opacity-100' : 'opacity-0'
          } fixed inset-0 bg-black bg-opacity-50 transition-all duration-200 z-[1000]`}
        onClick={handleClose}
      />
      <div className="absolute z-[2000] right-2 top-2 flex gap-2.5 text-basicWhite text-xl cursor-pointer">
        <ICONS.antDClose
          onClick={handleClose}
          className="hover:text-basicBlack"
        />
      </div>
      <div
        onClick={handleFileRefClick}
        className={`fixed flex items-center ${isExtractingData ? '' : 'cursor-pointer'
          } justify-center md:w-[34rem] rounded-lg md:h-[28rem] w-[20rem] h-[20rem] bg-temporaryGray z-[20000] inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        {isExtractingData ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-lg font-medium text-gray-700 text-center">
              Extracting data from your invoices...
            </p>
            <CommonLoader color={COLORS.primaryColor} />
          </div>
        ) : (
          <p className="text-base text-gray-600">Choose images to upload</p>
        )}

        <input
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e)}
          ref={fileInputRef}
          accept="image/*"
          multiple
        />
      </div>
    </div>
  );
};

export default MultipleImageUploadModal;
