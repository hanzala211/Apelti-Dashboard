import { COLORS } from '@constants';
import { useInvoice } from '@context';
import { InvoiceOverview } from '@components';

export const InvoiceRightPanelOverview: React.FC = () => {
  const { reviewData, setReviewData, setSelectedData, deleteInvoiceMutation } =
    useInvoice();

  const handleEdit = () => {
    setSelectedData(reviewData);
    setReviewData(null);
  };

  const handleDelete = () => {
    deleteInvoiceMutation.mutate(reviewData?._id || '');
  };

  return (
    <InvoiceOverview
      data={reviewData || {}}
      showControls={true}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isDeleting={deleteInvoiceMutation.isPending}
      deleteButtonColor={COLORS.primaryColor}
    />
  );
};

export default InvoiceRightPanelOverview;
