import { ReactElement, useRef, useState } from 'react';
import { Modal } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

interface DraggableModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalItems: ReactElement;
  heading: string;
  handleOk: () => void;
  okText?: string;
  onReset?: () => void;
}

export const DraggableModal: React.FC<DraggableModalProps> = ({
  open,
  setOpen,
  modalItems: Compo,
  heading,
  handleOk: handleChange,
  okText = 'Ok',
  onReset,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null!);

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
    handleChange();
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
    if (onReset) {
      onReset();
    }
  };

  const afterClose = () => {
    if (onReset) {
      onReset();
    }
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        title={
          <div
            className="w-full cursor-move"
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            {heading}
          </div>
        }
        open={open}
        okText={okText}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={afterClose}
        okButtonProps={{
          className:
            'bg-primaryColor border-none hover:!bg-opacity-50 text-white hover:!bg-primaryColor active:!bg-primaryColor focus:!bg-primaryColor',
        }}
        cancelButtonProps={{
          className:
            'bg-transparent border-silverGray hover:!bg-transparent hover:!border-mistGray hover:!border-neutralGray active:!bg-transparent hover:!text-neutralGray',
        }}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {Compo}
      </Modal>
    </>
  );
};

export default DraggableModal;
