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
    selectedData,
    setSelectedData,
    formData
  } = useInvoice();

  return (!selectedData || selectedImage ? selectedImage === null : !selectedData.fileUrl) ? (
    <div className="bg-mistGray h-full md:w-full w-0 hidden mt-0.5 md:flex flex-col items-center justify-center">
      <ReactSVG
        src={ICONS.add_invoice}
        beforeInjection={(svg) => {
          if (window.innerWidth < 1024) {
            svg.classList.add('w-44');
            svg.classList.add('h-44');
            svg.classList.add("text-primaryColor")
          }
        }}
      />
      <h1 className="lg:text-[22px] text-[18px] text-center font-semibold">
        If you have an invoice in the folder, enter it here or
      </h1>
      <button
        onClick={handleFile}
        className="text-darkBlue font-semibold before:w-36 before:-translate-x-1/2 before:left-1/2 before:absolute relative before:h-1 before:bg-darkBlue before:-bottom-1"
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
      {!formData && <div className="bg-basicWhite border-b flex justify-between items-center border-basicSilver py-4 px-3 mt-0.5">
        <p className='m-0'>{selectedImage?.label}</p>
        <button onClick={() => {
          if (selectedData) {
            setSelectedData({
              ...selectedData,
              fileUrl: ""
            })
          } else {
            setSelectedImage(null)
          }
        }}>
          <ReactSVG src={ICONS.close} />
        </button>
      </div>}
      <div className={`w-full ${formData ? "h-[90vh]" : "h-[82vh]"} flex items-center justify-center overflow-hidden`}>
        <img
          src={!selectedData || selectedImage ? selectedImage?.value : selectedData.fileUrl}
          alt={`${selectedImage?.label || 'Invoice'} Image`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div >
  );
};

export default InvoiceLeftPanel;
