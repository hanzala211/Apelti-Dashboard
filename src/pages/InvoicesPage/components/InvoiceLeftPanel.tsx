import { ICONS } from '@constants';
import { useInvoice } from '@context';
import { ReactSVG } from 'react-svg';

export const InvoiceLeftPanel: React.FC = () => {
  const {
    selectedImage,
    handleChange,
    handleFile,
    setSelectedImage,
    fileInputRef,
  } = useInvoice();

  return selectedImage === null ? (
    <div className="bg-mistGray h-full md:w-full w-0 hidden mt-0.5 md:flex flex-col items-center justify-center">
      <ReactSVG
        src={ICONS.add_invoice}
        beforeInjection={(svg) => {
          if (window.innerWidth < 1024) {
            svg.classList.add('w-44');
            svg.classList.add('h-44');
          }
        }}
      />
      <h1 className="lg:text-[22px] text-[18px] text-center font-semibold">
        If you have an invoice in the folder, enter it here or
      </h1>
      <button
        onClick={handleFile}
        className="text-darkBlue font-semibold before:w-36 before:-translate-x-1/2 before:left-1/2 before:absolute relative before:h-1 before:bg-darkBlue before:bottom-0"
      >
        Browse Folders
      </button>
      <input
        ref={fileInputRef}
        onChange={handleChange}
        type="file"
        className="hidden"
      />
    </div>
  ) : (
    <div className="w-full md:block bg-mistGray hidden h-full">
      <div className="bg-basicWhite border-b flex justify-between border-basicSilver py-4 px-3 mt-0.5">
        <p>{selectedImage.label}</p>
        <button onClick={() => setSelectedImage(null)}>
          <ReactSVG src={ICONS.close} />
        </button>
      </div>
      <div className="w-full h-[82vh] flex items-center justify-center overflow-hidden">
        <img
          src={selectedImage.value}
          alt={`${selectedImage.label} Image`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default InvoiceLeftPanel;
