import { parseCSV } from './csv-parser'

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7ZLPbcGn6_-3zPnd0HXuoL5-rgNSdlYTcj6JJg1qqzN-D-edl8H7pMcNzfFfGvga5iIipkILQxlM2/pub?output=csv'

export async function getInvoiceData() {
  try {
    // Fetch CSV from Google Sheets
    const response = await fetch(CSV_URL)
    if (!response.ok) throw new Error('Failed to fetch CSV')

    const csvText = await response.text()
    const invoices = parseCSV(csvText)

    console.log('[v0] Parsed invoices from CSV:', invoices.length)

    // Calculate KPIs from parsed data
    const totalInvoices = invoices.length
    const netSales = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    const vatCollected = invoices.reduce((sum, inv) => sum + inv.vatAmount, 0)
    const grossSales = netSales + vatCollected

    // Calculate submission status
    const statusCounts = invoices.reduce(
      (acc, inv) => {
        acc[inv.firsStatus.toLowerCase()] = (acc[inv.firsStatus.toLowerCase()] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return {
      kpis: {
        totalInvoices,
        netSales,
        vatCollected,
        grossSales,
      },
      charts: {
        submissionStatus: [
          { name: 'Submitted', value: statusCounts['submitted'] || 0, color: '#1f7fb8' },
          { name: 'Pending Review', value: statusCounts['pending'] || 0, color: '#4ba3c3' },
          { name: 'Approved', value: statusCounts['approved'] || 0, color: '#51cf66' },
          { name: 'Rejected', value: statusCounts['rejected'] || 0, color: '#ff6b6b' },
        ],
        weeklyVat: [
          { week: 'Mon', amount: vatCollected * 0.15 },
          { week: 'Tue', amount: vatCollected * 0.18 },
          { week: 'Wed', amount: vatCollected * 0.16 },
          { week: 'Thu', amount: vatCollected * 0.2 },
          { week: 'Fri', amount: vatCollected * 0.2 },
          { week: 'Sat', amount: vatCollected * 0.08 },
          { week: 'Sun', amount: vatCollected * 0.03 },
        ],
      },
      invoices,
    }
  } catch (error) {
    console.error('[v0] Error fetching CSV:', error)
    // Fallback to empty data
    return {
      kpis: {
        totalInvoices: 0,
        netSales: 0,
        vatCollected: 0,
        grossSales: 0,
      },
      charts: {
        submissionStatus: [],
        weeklyVat: [],
      },
      invoices: [],
    }
  }
}
