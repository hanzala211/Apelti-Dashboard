import { ReactSVG } from 'react-svg';

interface SvgIconProps {
  src: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  injectionOptions?: {
    fill?: string;
    stroke?: string;
  };
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  src,
  size = 14,
  className = '',
  onClick,
  injectionOptions = { fill: 'none', stroke: 'currentColor' },
}) => {
  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        svg.querySelectorAll('path').forEach((path) => {
          path.setAttribute('fill', injectionOptions.fill || 'none');
          path.setAttribute('stroke', injectionOptions.stroke || 'currentColor');
        });
        svg.style.height = `${size}px`;
        svg.style.width = `${size}px`;
      }}
      className={className}
      onClick={onClick}
    />
  );
};

export default SvgIcon;
