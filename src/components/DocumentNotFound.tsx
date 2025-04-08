import { ICONS } from '@constants';
import { ReactSVG } from 'react-svg';

export const DocumentNotFound: React.FC = () => {
  return (
    <div className='flex items-center justify-center flex-col h-full'>
      <ReactSVG
        src={ICONS.add_invoice}
        beforeInjection={(svg) => {
          if (window.innerWidth < 1024) {
            svg.classList.add('w-32');
            svg.classList.add('h-32');
            svg.classList.add('text-primaryColor');
          }
        }}
      />
      <h1 className="lg:text-[22px] text-[18px] text-center font-semibold">
        No Document Found.
      </h1>
    </div>
  );
};

export default DocumentNotFound;
