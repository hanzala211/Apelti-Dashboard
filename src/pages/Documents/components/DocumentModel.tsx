import React, { useState } from "react";
import { Modal } from "antd";
import { ICONS } from "@constants";

interface DocumentModelProps {
  fileUrl: string;
  visible: boolean;
  onClose: () => void;
}

const DocumentModel: React.FC<DocumentModelProps> = ({
  fileUrl,
  visible,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));

  return (
    <>
      <div className="absolute z-[2000] right-2 top-2 flex gap-2.5 text-basicWhite text-xl cursor-pointer">
        <ICONS.zoomIn
          onClick={handleZoomIn}
          className="hover:text-basicBlack"
        />
        <ICONS.zoomOut
          onClick={handleZoomOut}
          className="hover:text-basicBlack"
        />
        <ICONS.antDClose onClick={onClose} className="hover:text-basicBlack" />
      </div>
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={null}
        centered
        keyboard
        styles={{
          content: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            padding: "0px",
            margin: "0px",
          },
        }}
        closeIcon={null}
      >
        <div className="flex flex-col items-center justify-center relative">
          <img
            src={fileUrl}
            alt="Document"
            style={{ transform: `scale(${zoom})` }}
            className="max-w-full max-h-[80vh] transition-transform duration-300 ease"
          />
        </div>
      </Modal>
    </>
  );
};

export default DocumentModel;
