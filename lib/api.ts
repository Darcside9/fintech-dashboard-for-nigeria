export async function getInvoiceData() {
  // In production, this would call your actual API endpoint
  // For now, returning mock data that matches the expected structure

  const mockData = {
    kpis: {
      totalInvoices: 2849,
      netSales: 132140000,
      vatCollected: 9910500,
      grossSales: 142050500,
    },
    charts: {
      submissionStatus: [
        { name: "Submitted", value: 2200, color: "#1f7fb8" },
        { name: "Pending Review", value: 481, color: "#4ba3c3" },
        { name: "Approved", value: 140, color: "#51cf66" },
        { name: "Rejected", value: 28, color: "#ff6b6b" },
      ],
      weeklyVat: [
        { week: "Mon", amount: 1250000 },
        { week: "Tue", amount: 1680000 },
        { week: "Wed", amount: 1420000 },
        { week: "Thu", amount: 1890000 },
        { week: "Fri", amount: 2100000 },
        { week: "Sat", amount: 980000 },
        { week: "Sun", amount: 92500 },
      ],
    },
    invoices: [
      {
        id: "1",
        invoiceNumber: "INV-2024-001847",
        customer: "Dangote Group",
        amount: 5250000,
        vatAmount: 393750,
        status: "submitted",
        submissionDate: "2024-01-15T10:30:00Z",
        firsStatus: "approved",
        lineItems: [
          { description: "Cement (50kg bags)", quantity: 1000, unitPrice: 5000 },
          { description: "Delivery & Logistics", quantity: 1, unitPrice: 250000 },
        ],
        firsLogs: [
          { timestamp: "2024-01-15T10:30:00Z", event: "Invoice Submitted", status: "success" },
          { timestamp: "2024-01-15T11:15:00Z", event: "FIRS Validation Started", status: "success" },
          { timestamp: "2024-01-15T11:45:00Z", event: "VAT Verification", status: "success" },
          { timestamp: "2024-01-15T12:30:00Z", event: "Approval Granted", status: "success" },
        ],
      },
      {
        id: "2",
        invoiceNumber: "INV-2024-001846",
        customer: "MTN Nigeria",
        amount: 3750000,
        vatAmount: 281250,
        status: "submitted",
        submissionDate: "2024-01-15T09:00:00Z",
        firsStatus: "approved",
        lineItems: [
          { description: "Telecom Services", quantity: 1, unitPrice: 3500000 },
          { description: "Equipment Rental", quantity: 12, unitPrice: 20833 },
        ],
        firsLogs: [
          { timestamp: "2024-01-15T09:00:00Z", event: "Invoice Submitted", status: "success" },
          { timestamp: "2024-01-15T09:30:00Z", event: "Format Validation", status: "success" },
          { timestamp: "2024-01-15T10:15:00Z", event: "Approval Granted", status: "success" },
        ],
      },
      {
        id: "3",
        invoiceNumber: "INV-2024-001845",
        customer: "First Bank Nigeria",
        amount: 2890000,
        vatAmount: 216750,
        status: "pending",
        submissionDate: "2024-01-14T16:45:00Z",
        firsStatus: "pending",
        lineItems: [
          { description: "Financial Advisory", quantity: 1, unitPrice: 2700000 },
          { description: "Administrative Fees", quantity: 1, unitPrice: 190000 },
        ],
        firsLogs: [
          { timestamp: "2024-01-14T16:45:00Z", event: "Invoice Submitted", status: "success" },
          { timestamp: "2024-01-14T17:20:00Z", event: "FIRS Review in Progress", status: "pending" },
        ],
      },
      {
        id: "4",
        invoiceNumber: "INV-2024-001844",
        customer: "Zenith Bank",
        amount: 4125000,
        vatAmount: 309375,
        status: "submitted",
        submissionDate: "2024-01-14T14:20:00Z",
        firsStatus: "rejected",
        lineItems: [
          { description: "IT Consulting Services", quantity: 1, unitPrice: 3500000 },
          { description: "Software License (Annual)", quantity: 1, unitPrice: 625000 },
        ],
        firsLogs: [
          { timestamp: "2024-01-14T14:20:00Z", event: "Invoice Submitted", status: "success" },
          { timestamp: "2024-01-14T15:00:00Z", event: "FIRS Validation Started", status: "success" },
          { timestamp: "2024-01-14T16:30:00Z", event: "VAT Discrepancy Detected", status: "error" },
          { timestamp: "2024-01-14T17:45:00Z", event: "Invoice Rejected", status: "error" },
          {
            timestamp: "2024-01-15T08:00:00Z",
            event: "Rejection Reason: VAT amount does not match taxable value",
            status: "error",
          },
        ],
      },
      {
        id: "5",
        invoiceNumber: "INV-2024-001843",
        customer: "BUA Cement",
        amount: 6800000,
        vatAmount: 510000,
        status: "pending",
        submissionDate: "2024-01-15T13:15:00Z",
        firsStatus: "pending",
        lineItems: [
          { description: "Cement (Bulk Order)", quantity: 2000, unitPrice: 3000 },
          { description: "Transportation", quantity: 1, unitPrice: 800000 },
        ],
        firsLogs: [
          { timestamp: "2024-01-15T13:15:00Z", event: "Invoice Submitted", status: "success" },
          { timestamp: "2024-01-15T13:45:00Z", event: "Format Validation", status: "success" },
          { timestamp: "2024-01-15T14:20:00Z", event: "FIRS Review Queued", status: "pending" },
        ],
      },
    ],
  }

  return mockData
}
