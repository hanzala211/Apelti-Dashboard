import { PageHeading } from "@components";
import { DocumentTable } from "./components/DocumentTable";
import { APP_ACTIONS, DATE_FOMRAT, PERMISSIONS, ROUTES } from "@constants";
import { IDocument } from "@types";
import { useEffect, useState } from "react";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useAuth } from "@context";
import { Navigate } from "react-router-dom";
import DocumentTableSkeleton from "./components/DocumentTableSkeleton";
import { formatDate } from "@helpers";
import { useGetDocumentsQuery } from "@api";

export const DocumentPage: React.FC = () => {
  const { userData } = useAuth();
  const [searchData, setSearchData] = useState<IDocument[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  const { data: documents, isLoading: isDocumentsLoading } =
    useGetDocumentsQuery();

  useEffect(() => {
    if (searchInput.length > 1 || searchDate) {
      handleSearch();
    } else {
      setSearchData([]);
    }
  }, [searchInput, searchDate, documents]);

  const handleSearch = () => {
    const foundSearches =
      documents &&
      documents
        .filter((item: IDocument) => {
          const matchesName =
            item.fileName && searchInput.trim().length > 0
              ? item.fileName.toLowerCase().includes(searchInput.toLowerCase())
              : false;
          const matchesDate = searchDate
            ? formatDate(item.createdAt) === searchDate
            : false;

          return matchesName || matchesDate;
        })
        .map((item: IDocument) => {
          return {
            fileName: item.fileName || "",
            documentType: item.documentType || "",
            createdAt: item.createdAt || "",
            fileUrl: item.fileUrl || "",
            name: item.fileName || "",
            section: item.documentType || "",
            added: item.createdAt || "",
          };
        });

    setSearchData(foundSearches as IDocument[]);
  };

  const handleChange: DatePickerProps["onChange"] = (_, dateString) => {
    const formattedDate = Array.isArray(dateString)
      ? dateString[0]
      : dateString;
    setSearchDate(formattedDate);
  };

  if (!userPermissions.includes(APP_ACTIONS.documentPage))
    return <Navigate to={ROUTES.not_available} />;

  return (
    <section className="md:px-14 md:py-9 px-2 pt-20">
      <PageHeading label="Documents" />
      <div className="mt-8 w-full xl:max-w-[70%] max-w-full">
        <div className="flex justify-between flex-wrap gap-5 md:gap-0 items-center">
          <div className="flex gap-7 flex-wrap">
            <div className="flex gap-2 items-center">
              <label htmlFor="name" className="text-[14px] md:text-[16px]">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 rounded-full px-2 py-1 text-[14px] border-[1px] md:w-auto w-52"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="date" className="text-[14px] md:text-[16px]">
                Added
              </label>
              <DatePicker
                format={DATE_FOMRAT}
                placeholder={DATE_FOMRAT}
                className="px-2 py-1 text-[14px] border-[1px] !rounded-full md:w-auto w-52"
                value={searchDate ? dayjs(searchDate, DATE_FOMRAT) : null}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="h-[100dvh] max-h-[calc(100dvh-238px)] overflow-y-auto md:mt-4">
          {isDocumentsLoading ? (
            <DocumentTableSkeleton />
          ) : (
            <DocumentTable searchData={searchData} document={documents} />
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentPage;
