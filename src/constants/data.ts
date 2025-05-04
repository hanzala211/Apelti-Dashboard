import { COLORS } from '@constants';
import { ChartState, InvoiceRules } from '@types';

export const INVOICES_DATA = [
  {
    businessName: "EdTech D.O.O",
    businessAddress: "123 Tech Street, Silicon Valley, CA 94025",
    businessContact: "+1 (555) 123-4567",
    businessTaxId: "TAX123456789",
    businessBankDetails: "Bank of America / ACC: 1234567890",
    clientName: "Software Tritech",
    clientAddress: "456 Client Avenue, Tech Park",
    clientContact: "+1 (555) 987-6543",
    invoiceNumber: "2013",
    date: "03/02/2025",
    dueDate: "20/02/2025",
    currency: "R",
    paymentTerms: "Net 30",
    vatNumber: "VAT87654321",
    items: [
      {
        description: "Software Development Services",
        unitCost: "4528.00",
        quantity: "1",
        total: "4528.00",
        _id: "item_2013_1"
      }
    ],
    subtotal: "4528.00",
    discount: "0.00",
    tax: "0.00",
    total: "4528.00",
    company: "EdTech D.O.O",
    status: "Paid",
    approvedBy: "John Manager",
    uploadedBy: "Sarah Accountant",
    _id: "inv_2013",
    createdAt: "2025-02-03T08:00:00.000Z",
    updatedAt: "2025-02-03T08:00:00.000Z",
    __v: 0
  },
  {
    businessName: "Global Solutions Inc",
    businessAddress: "789 Global Plaza, Business District",
    businessContact: "+1 (555) 234-5678",
    businessTaxId: "TAX987654321",
    businessBankDetails: "Chase Bank / ACC: 9876543210",
    clientName: "Marketing Services Corp",
    clientAddress: "321 Marketing Lane",
    clientContact: "+1 (555) 345-6789",
    invoiceNumber: "2014",
    date: "05/02/2025",
    dueDate: "25/02/2025",
    currency: "R",
    paymentTerms: "Net 30",
    vatNumber: "VAT76543210",
    items: [
      {
        description: "Marketing Campaign",
        unitCost: "3200.00",
        quantity: "1",
        total: "3200.00",
        _id: "item_2014_1"
      }
    ],
    subtotal: "3200.00",
    discount: "0.00",
    tax: "0.00",
    total: "3200.00",
    company: "Global Solutions Inc",
    status: "Unpaid",
    approvedBy: null,
    uploadedBy: "Mike Finance",
    _id: "inv_2014",
    createdAt: "2025-02-05T09:00:00.000Z",
    updatedAt: "2025-02-05T09:00:00.000Z",
    __v: 0
  },
  {
    businessName: "IT Innovations LLC",
    businessAddress: "101 Innovation Hub, Tech City",
    businessContact: "+1 (555) 456-7890",
    businessTaxId: "TAX567890123",
    businessBankDetails: "Wells Fargo / ACC: 5678901234",
    clientName: "Cloud Infrastructure Solutions",
    clientAddress: "202 Cloud Street",
    clientContact: "+1 (555) 567-8901",
    invoiceNumber: "2015",
    date: "10/02/2025",
    dueDate: "28/02/2025",
    currency: "R",
    paymentTerms: "Net 30",
    vatNumber: "VAT65432109",
    items: [
      {
        description: "Cloud Infrastructure Setup",
        unitCost: "7650.00",
        quantity: "1",
        total: "7650.00",
        _id: "item_2015_1"
      }
    ],
    subtotal: "7650.00",
    discount: "0.00",
    tax: "0.00",
    total: "7650.00",
    company: "IT Innovations LLC",
    status: "Return",
    approvedBy: "David Director",
    uploadedBy: "Lisa Admin",
    _id: "inv_2015",
    createdAt: "2025-02-10T10:00:00.000Z",
    updatedAt: "2025-02-10T10:00:00.000Z",
    __v: 0
  }
];

export const DOCUMENTS_DATA = [
  {
    fileName: 'InvoiceExample.jpg',
    documentType: 'Company',
    createdAt: '20/02/2025',
    fileUrl: "https://res.cloudinary.com/dulovaduo/image/upload/v1743990211/invoices/invoice_1743990210810.jpg",
  },
  {
    fileName: 'Contract.pdf',
    documentType: 'Legal',
    createdAt: '10/01/2025',
    fileUrl: '/assets/images/placeholder.jpg',
  },
  {
    fileName: 'Receipt.png',
    documentType: 'Finance',
    createdAt: '05/02/2025',
    fileUrl: '/assets/images/placeholder.jpg',
  },
];

export const MESSAGES_DATA = [
  {
    companyName: 'SpiceImporter LTD',
    isDuplicate: true,
    fileName: 'Invoice.spiceimporte.xakda.jpg',
    supplierName: 'Dodao Adnan Hodzic',
    imgPath: '/assets/images/invoice-template.png',
    _id: '0',
  },
  {
    companyName: 'Teds LLC',
    isDuplicate: false,
    fileName: 'Invoice.spiceimporte.xakda.jpg',
    supplierName: 'Dodao Adnan Hodzic',
    imgPath: '/assets/images/invoice-template-2.png',
    _id: '1',
  },
];

export const CHART_DATA: ChartState = {
  series: [
    {
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false },
      toolbar: {
        show: false,
      },
    },
    colors: [COLORS.primaryColor],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  },
};

export const COLUMN_CHART = {
  series: [
    {
      name: 'Data Series',
      data: [300, 220, 120, 250, 400, 380, 450, 340, 220],
    },
  ],
  options: {
    chart: {
      type: 'bar' as const,
      // If you want to remove chart toolbar (download, zoom, etc.), set the following:
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '10%', // Adjust column width,
      },
    },
    dataLabels: {
      enabled: false, // Hide data labels on bars
    },
    xaxis: {
      // For a simple numeric x-axis, you can remove categories
      // or set your own categories for each bar:
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: COLORS.basicWhite, // X-axis label color
        },
      },
    },
    yaxis: {
      min: 0,
      max: 500,
      tickAmount: 5, // 0, 100, 200, 300, 400, 500
      labels: {
        style: {
          colors: COLORS.basicWhite, // Y-axis label color
        },
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    // You can customize colors if desired
    colors: [COLORS.basicWhite],
    // Optional: If you want to style the background in a gradient, you can do that
    // in the parent container or by using chart.background
  }
}

export const DEFINE_RULES_DATA: InvoiceRules[] = [
  {
    keyWord: "discount",
    invoiceArea: "billing",
    field: "amount",
    action: "subtract",
    value: 10,
    status: "active",
  },
  {
    keyWord: "tax",
    invoiceArea: "finance",
    field: "rate",
    action: "add",
    value: 5,
    status: "inactive",
  },
  {
    keyWord: "late_fee",
    invoiceArea: "payment",
    field: "penalty",
    action: "add",
    value: 20,
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
  {
    keyWord: "promo_code",
    invoiceArea: "checkout",
    field: "code",
    action: "apply",
    value: "SAVE10",
    status: "active",
  },
];
