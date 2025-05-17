import { ComponentType, ReactElement, useRef, useState } from "react";
import { COLORS, ICONS } from "@constants";
import { useLocation } from "react-router-dom";
import { useAuth } from "@context";

interface ResizableSliderProps {
  Left: ComponentType | null;
  Right: ReactElement;
  initialLeftWidth?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export const ResizableSlider: React.FC<ResizableSliderProps> = ({
  Left,
  Right,
  initialLeftWidth = window.innerWidth > 1024 ? 900 : 500,
  minLeftWidth = 600,
  minRightWidth = 200,
}) => {
  const [leftWidth, setLeftWidth] = useState<number>(initialLeftWidth);
  const { selectedMessage } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const initialWidthRef = useRef(0);
  const location = useLocation();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    initialWidthRef.current = leftWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const maxWidth = containerRect.width - minRightWidth;
    let newWidth = initialWidthRef.current + (e.clientX - startXRef.current);
    newWidth = Math.max(minLeftWidth, Math.min(newWidth, maxWidth));
    setLeftWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex w-full h-full">
      <div
        style={{
          flexBasis: location.pathname.includes("messages")
            ? window.innerWidth < 768
              ? selectedMessage === null
                ? leftWidth
                : 0
              : leftWidth
            : window.innerWidth > 768
            ? leftWidth
            : 0,
        }}
        className={`flex-shrink-[0.5]`}
      >
        {Left && <Left />}
      </div>
      {Left && (
        <div
          className="relative md:block hidden w-2 bg-primaryColor cursor-col-resize"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute shadow-xl shadow-silverGray py-2 top-1/2 z-10 -translate-y-1/2 bg-basicWhite border-[2px] border-primaryColor left-1/2 -translate-x-1/2 flex">
            <ICONS.leftArrowSlider color={COLORS.primaryColor} />
            <ICONS.rightArrowSlider color={COLORS.primaryColor} />
          </div>
        </div>
      )}
      {Right}
    </div>
  );
};

export default ResizableSlider;
