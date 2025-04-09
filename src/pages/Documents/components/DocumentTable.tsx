import { DOCUMENTS_DATA, ICONS } from '@constants';
import { IDocument } from '@types';

export const DocumentTable: React.FC<{ searchData: IDocument[] }> = ({
  searchData,
}) => {
  return (
    <table className="min-w-full sm:text-[16px] text-[11px] text-left">
      <thead className={`border-b sticky top-0 bg-mistGray`}>
        <tr>
          <th className="px-4 py-2 font-bold">Name</th>
          <th className="px-4 py-2 font-bold">Section</th>
          <th className="px-4 py-2 font-bold">Added</th>
        </tr>
      </thead>
      <tbody>
        {(searchData?.length !== 0 ? searchData : DOCUMENTS_DATA).map(
          (item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 flex gap-2 items-center">
                <ICONS.documentSVG /> {item.name}
              </td>
              <td className="px-4 py-2">{item.section}</td>
              <td className="px-4 py-2">{item.added}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
