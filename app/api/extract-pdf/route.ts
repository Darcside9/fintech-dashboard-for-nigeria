export const runtime = 'nodejs'

interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

async function extractPdfText(pdfUrl: string): Promise<string> {
  try {
    const response = await fetch(pdfUrl)
    if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`)

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Simple text extraction from PDF buffer
    // PDF files have readable text streams we can extract
    const text = buffer.toString('latin1')
    const cleanText = text
      .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
      .split('stream')[0] // Remove binary streams
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join('\n')
    
    return cleanText
  } catch (error) {
    console.error('[v0] Error extracting PDF text:', error)
    return ''
  }
}

function parseLineItemsFromText(text: string): LineItem[] {
  const lineItems: LineItem[] = []

  // Split text into lines and filter out empty ones
  const lines = text.split('\n').filter((line) => line.trim())

  // Find the line items section - typically starts with headers like "Description", "Qty", etc.
  let startIdx = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    if (
      (line.includes('description') && line.includes('qty')) ||
      (line.includes('item') && line.includes('quantity'))
    ) {
      startIdx = i + 1
      break
    }
  }

  if (startIdx === -1) {
    console.warn('[v0] Could not find line items section in PDF')
    return []
  }

  // Parse line items
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim()

    // Stop if we hit totals section
    if (
      line.toLowerCase().includes('subtotal') ||
      line.toLowerCase().includes('vat') ||
      line.toLowerCase().includes('total') ||
      line.toLowerCase().includes('discount')
    ) {
      break
    }

    // Skip empty lines or header separators
    if (!line || line.includes('---') || line.includes('===')) {
      continue
    }

    // Try to parse the line
    const parsed = parseLineItem(line)
    if (parsed) {
      lineItems.push(parsed)
    }
  }

  return lineItems
}

function parseLineItem(line: string): LineItem | null {
  try {
    // Try pipe-separated format first
    if (line.includes('|')) {
      const parts = line.split('|').map((p) => p.trim())
      if (parts.length >= 3) {
        const description = parts[0]
        const quantity = parseFloat(parts[1])
        const unitPrice = parseFloat(parts[2])

        if (!isNaN(quantity) && !isNaN(unitPrice) && description) {
          return { description, quantity, unitPrice }
        }
      }
    }

    // Try extracting numbers from the line
    const numberMatches = line.match(/\d+\.?\d*/g)
    if (numberMatches && numberMatches.length >= 2) {
      // Get description (everything before the first number)
      const descMatch = line.match(/^([^0-9]+?)/)
      if (descMatch) {
        const description = descMatch[1].trim()
        const numbers = numberMatches.map((n) => parseFloat(n))

        if (numbers.length >= 2 && description.length > 3) {
          const unitPrice = numbers[numbers.length - 1]
          const quantity = numbers[numbers.length - 2]

          if (quantity > 0 && unitPrice > 0 && quantity < 10000) {
            return { description, quantity, unitPrice }
          }
        }
      }
    }

    return null
  } catch (error) {
    console.error('[v0] Error parsing line item:', error)
    return null
  }
}

async function extractLineItemsFromPdf(pdfUrl: string): Promise<LineItem[]> {
  if (!pdfUrl) return []

  try {
    const text = await extractPdfText(pdfUrl)
    console.log('[v0] Extracted PDF text length:', text.length)
    const lineItems = parseLineItemsFromText(text)
    console.log('[v0] Parsed line items:', lineItems.length)
    return lineItems
  } catch (error) {
    console.error('[v0] Error extracting line items from PDF:', error)
    return []
  }
}

export async function POST(request: Request) {
  try {
    const { pdfUrl } = await request.json()

    if (!pdfUrl) {
      return Response.json({ error: 'pdfUrl is required' }, { status: 400 })
    }

    const lineItems = await extractLineItemsFromPdf(pdfUrl)

    return Response.json({ lineItems, success: true })
  } catch (error) {
    console.error('[v0] PDF extraction error:', error)
    return Response.json(
      { error: 'Failed to extract PDF', success: false },
      { status: 500 }
    )
  }
}
