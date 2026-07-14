interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

interface ParsedInvoice {
  id: string
  invoiceNumber: string
  customer: string
  amount: number
  vatAmount: number
  status: "submitted" | "pending" | "rejected" | "approved"
  submissionDate: string
  firsStatus: string
  lineItems: LineItem[]
  pdfLink: string
  firsLogs: Array<{ timestamp: string; event: string; status: string }>
}

export function parseCSV(csvText: string): ParsedInvoice[] {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim())
  const invoices: ParsedInvoice[] = []

  // Find column indices
  const getColumnIndex = (name: string) => headers.findIndex(h => h.toLowerCase() === name.toLowerCase())

  const invoiceCol = getColumnIndex('Invoice #')
  const customerCol = getColumnIndex('Customer')
  const amountCol = getColumnIndex('Amount')
  const vatCol = getColumnIndex('VAT')
  const statusCol = getColumnIndex('Status')
  const firsCol = getColumnIndex('FIRS')
  const dateCol = getColumnIndex('Date')
  const pdfCol = getColumnIndex('PDF Link')
  const lineItemsCol = getColumnIndex('Line Items Data')

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Parse CSV line handling quoted fields
    const fields = parseCSVLine(line)

    try {
      // Parse line items JSON
      let lineItems: LineItem[] = []
      if (lineItemsCol !== -1 && fields[lineItemsCol]) {
        const lineItemsStr = fields[lineItemsCol].trim()
        if (lineItemsStr) {
          lineItems = JSON.parse(lineItemsStr)
        }
      }

      // Determine status based on FIRS value
      const firsValue = fields[firsCol]?.toLowerCase() || ''
      let status: "submitted" | "pending" | "rejected" | "approved" = "pending"
      if (firsValue.includes('approved')) status = "approved"
      else if (firsValue.includes('rejected')) status = "rejected"
      else if (firsValue.includes('submitted')) status = "submitted"

      const invoice: ParsedInvoice = {
        id: `invoice-${i}`,
        invoiceNumber: fields[invoiceCol] || `INV-${i}`,
        customer: fields[customerCol] || 'Unknown',
        amount: parseFloat(fields[amountCol] || '0') || 0,
        vatAmount: parseFloat(fields[vatCol] || '0') || 0,
        status,
        submissionDate: new Date(fields[dateCol] || new Date()).toISOString(),
        firsStatus: fields[firsCol] || 'pending',
        pdfLink: fields[pdfCol] || '',
        lineItems,
        firsLogs: [
          {
            timestamp: new Date().toISOString(),
            event: 'Invoice Loaded from CSV',
            status: 'success',
          },
        ],
      }

      invoices.push(invoice)
    } catch (error) {
      console.error(`[v0] Error parsing row ${i}:`, error)
    }
  }

  return invoices
}

// Helper function to parse CSV line with proper quote handling
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

