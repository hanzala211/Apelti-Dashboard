import {
  Button,
  DraggableModal,
  InvoiceFilter,
  InvoiceWidget,
  PageHeading,
} from "@components";
import { APP_ACTIONS, COLORS, ICONS, PERMISSIONS, ROUTES } from "@constants";
import { useApproval, useAuth } from "@context";
import { Table } from "@components";
import { FilterTypes, Invoice } from "@types";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDate, handleInvoiceFilters } from "@helpers";
import { useEffect, useState } from "react";
import ApprovalModal from "./components/ApprovalModal";

export const ApprovalPage: React.FC = () => {
  const { userData } = useAuth();
  const {
    selectedApprovalInvoice,
    setSelectedApprovalInvoice,
    getApprovalInvoices,
  } = useApproval();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] =
    useState<boolean>(false);
  const [filters, setFilters] = useState<FilterTypes[]>([
    { id: 1, field: "", condition: "", value: "" },
  ]);
  const { data: approvalInvoices, isLoading: isApprovalInvoicesLoading } =
    useQuery({
      queryKey: ["approvalInvoices"],
      queryFn: () => getApprovalInvoices(),
    });
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(
    approvalInvoices?.invoices || []
  );
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  useEffect(() => {
    setFilteredInvoices(approvalInvoices?.invoices || []);
  }, [approvalInvoices]);

  const showFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const resetFilters = () => {
    setFilters([{ id: 1, field: "", condition: "", value: "" }]);
  };

  const showApprovalModal = () => {
    if (selectedApprovalInvoice !== null) {
      setIsApprovalModalOpen(true);
    }
  };

  const handleCloseApprovalModal = () => {
    setIsApprovalModalOpen(false);
  };

  const headings = [
    "Invoice Number",
    "Supplier",
    "PO no.",
    "Invoice Date",
    "Payment Term",
    "Amount",
    "Status",
  ];

  const keys: (keyof Invoice)[] = [
    "invoiceNumber",
    "supplierName",
    "poNumber",
    "invoiceDate",
    "paymentTerms",
    "amount",
    "status",
  ];

  if (!userPermissions.includes(APP_ACTIONS.approvalPage))
    return <Navigate to={ROUTES.not_available} />;

  const formattedInvoices =
    filteredInvoices?.map((invoice: Invoice) => ({
      ...invoice,
      invoiceDate:
        invoice.invoiceDate && invoice.invoiceDate.length > 0
          ? formatDate(invoice.invoiceDate)
          : "",
      paymentTerms:
        invoice.paymentTerms && invoice.paymentTerms.length > 0
          ? formatDate(invoice.paymentTerms)
          : "",
    })) ?? [];

  return (
    <section className="md:py-9 pt-20 w-screen md:max-w-[calc(100vw-256px)] h-[100dvh] overflow-y-auto">
      <div className="md:px-14 px-2 flex justify-between items-center">
        <PageHeading label="Approval" />
      </div>

      <div className="md:px-14 px-2 mt-4 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:gap-16 gap-2">
        <InvoiceWidget
          label="Approved Invoices"
          amount={approvalInvoices?.approvedInvoices || 0}
        />
        <InvoiceWidget
          label="Rejected Invoices"
          amount={approvalInvoices?.rejectedInvoices || 0}
        />
        <InvoiceWidget
          label="Pending Invoices"
          amount={approvalInvoices?.pendingInvoices || 0}
        />
        <InvoiceWidget
          label="Draft Invoices"
          amount={approvalInvoices?.draftInvoices || 0}
        />
      </div>
      <div className="flex mt-5 justify-between items-center md:px-14 px-2">
        <button
          onClick={showFilterModal}
          className="text-accentBlue rounded-md transition-all duration-200 flex gap-1 hover:bg-softBlue px-2 py-1 items-center md:text-[18px] text-[15px]"
        >
          <ICONS.plusIcon size={24} color={COLORS.primaryColor} />
          Add Filters
        </button>
        <Button btnText="Approve" handleClick={showApprovalModal} />
        <DraggableModal
          okText="Add"
          handleOk={() => {
            setFilteredInvoices(
              handleInvoiceFilters(approvalInvoices?.invoices, filters) || []
            );
            setIsFilterModalOpen(false)
          }}
          heading="In this view show records"
          modalItems={
            <InvoiceFilter filters={filters} setFilters={setFilters} />
          }
          setOpen={setIsFilterModalOpen}
          open={isFilterModalOpen}
          onReset={resetFilters}
        />
      </div>

      <Table
        selectedIndex={selectedApprovalInvoice}
        setSelectedIndex={setSelectedApprovalInvoice}
        keys={keys}
        headings={headings}
        data={formattedInvoices}
        isLoading={isApprovalInvoicesLoading}
      />
      <ApprovalModal
        handleClose={handleCloseApprovalModal}
        isModalOpen={isApprovalModalOpen}
      />
    </section>
  );
};

export default ApprovalPage;
