# Invoice Line Items Data - CSV Column Specification

## Overview

The **Line Items Data** column in your Google Sheet CSV contains a JSON array of line items for each invoice. This specification defines the exact format required for the dashboard to parse and display line items correctly.

---

## Data Structure

### Line Item Object

Each line item must be a JSON object with the following fields:

```typescript
{
  "description": string,    // Product/service description (required)
  "quantity": number,       // Number of units (required, must be > 0)
  "unitPrice": number       // Price per unit in NGN (required, must be > 0)
}
```

### Line Items Data Column Format

The entire column value is a **JSON array** containing multiple line item objects:

```json
[
  {
    "description": "string describing the item",
    "quantity": number,
    "unitPrice": number
  },
  {
    "description": "another item",
    "quantity": number,
    "unitPrice": number
  }
]
```

---

## Field Specifications

### `description` (string)
- **Required**: Yes
- **Length**: 3-200 characters recommended
- **Examples**:
  - "Professional Consulting Services"
  - "Software License (Annual)"
  - "Equipment & Hardware Supply"
  - "Training and Support Services"
  - "Maintenance & Technical Support"

### `quantity` (number)
- **Required**: Yes
- **Valid Range**: 1 to 10,000
- **Type**: Positive integer or decimal
- **Examples**:
  - `1` (single unit)
  - `10` (ten units)
  - `100.5` (partial quantities allowed)

### `unitPrice` (number)
- **Required**: Yes
- **Valid Range**: 1 to 1,000,000,000 (no upper limit, in NGN)
- **Type**: Positive integer or decimal
- **Notes**: Stored in NGN (Nigerian Naira)
- **Examples**:
  - `5000` (₦5,000 per unit)
  - `250000` (₦250,000 per unit)
  - `1500000.50` (₦1,500,000.50 per unit)

---

## Validation Rules

✓ **Must Pass**:
1. Valid JSON format (must parse without errors)
2. Array structure with at least 1 item
3. Each item has `description`, `quantity`, and `unitPrice`
4. `quantity` and `unitPrice` are positive numbers > 0
5. `description` is a non-empty string

✗ **Will Fail**:
- Invalid JSON (missing quotes, unescaped characters)
- Empty array `[]`
- Missing required fields
- Negative or zero quantities/prices
- Non-numeric quantity or unitPrice values

---

## CSV Placement

In your Google Sheet, place the JSON in the **Line Items Data** column:

| Invoice # | Customer | Amount | VAT | Status | FIRS | Date | PDF Link | Line Items Data |
|-----------|----------|--------|-----|--------|------|------|----------|-----------------|
| INV-2026-8142 | Apex Fintech | 320,683,012.50 | 22,349,512.5 | pending | pending | 7/12/2026 | https://... | `[{"description":"Professional Services","quantity":5,"unitPrice":32068301},{"description":"Software License","quantity":1,"unitPrice":160341507.5}]` |

---

## Examples

### Example 1: Simple Single Item Invoice
```json
[
  {
    "description": "Professional Consulting Services",
    "quantity": 1,
    "unitPrice": 500000
  }
]
```

### Example 2: Multi-Item Invoice (Most Common)
```json
[
  {
    "description": "Software Development (100 hours)",
    "quantity": 1,
    "unitPrice": 5000000
  },
  {
    "description": "Project Management & Support",
    "quantity": 3,
    "unitPrice": 1500000
  },
  {
    "description": "Deployment & Training",
    "quantity": 1,
    "unitPrice": 750000
  }
]
```

### Example 3: Bulk Purchase
```json
[
  {
    "description": "Premium Software Licenses",
    "quantity": 50,
    "unitPrice": 150000
  },
  {
    "description": "Implementation & Setup",
    "quantity": 1,
    "unitPrice": 1000000
  },
  {
    "description": "Annual Support & Maintenance",
    "quantity": 1,
    "unitPrice": 500000
  }
]
```

### Example 4: Equipment & Services
```json
[
  {
    "description": "Server Hardware (8 units)",
    "quantity": 8,
    "unitPrice": 2500000
  },
  {
    "description": "Installation & Configuration",
    "quantity": 1,
    "unitPrice": 1200000
  },
  {
    "description": "Network Setup",
    "quantity": 1,
    "unitPrice": 800000
  },
  {
    "description": "Documentation & Training (2 days)",
    "quantity": 2,
    "unitPrice": 400000
  }
]
```

---

## Automatic Calculations

The dashboard **automatically calculates**:

| Field | Formula | Display |
|-------|---------|---------|
| **Line Item Total** | `quantity × unitPrice` | NGN format with commas |
| **Subtotal** | Sum of all line item totals | NGN format with commas |
| **VAT (7.5%)** | `Subtotal × 0.075` | NGN format with commas |
| **Invoice Total** | `Subtotal + VAT` | Should match "Amount" column |

---

## AI Agent Prompt Template

Use this prompt with your AI agent to generate the proper Line Items Data JSON:

---

### 🤖 Prompt for Your AI Agent

```
You are generating invoice line items data in JSON format for a Nigerian fintech dashboard.

For each invoice, create a JSON array of line items following these rules:

STRUCTURE:
- Each item must have: description, quantity, unitPrice
- Format: [{"description":"...","quantity":X,"unitPrice":Y}, {...}]
- All numbers must be valid JSON numbers (no commas, no currency symbols)

RULES:
1. Description: Clear, concise product/service name (20-100 characters)
2. Quantity: Positive integer or decimal (1 to 10,000)
3. Unit Price: Price in Nigerian Naira (NGN) - positive number with no commas
4. Calculate: (quantity × unitPrice) = line item total
5. Sum all line item totals = invoice subtotal
6. Verify subtotal approximately matches invoice "Amount" (allow 1-2% variance)

EXAMPLES:
Invoice: INV-2026-8142, Amount: ₦320,683,012.50
Good JSON:
[
  {"description":"Professional Services","quantity":5,"unitPrice":32068301},
  {"description":"Software License (Annual)","quantity":1,"unitPrice":160341507.5}
]
Total: 32068301×5 + 160341507.5×1 = 320,683,012.50 ✓

INVOICE TO PROCESS:
- Invoice Number: [INVOICE_NUMBER]
- Customer: [CUSTOMER_NAME]
- Amount: [AMOUNT]
- Date: [DATE]
- Status: [STATUS]

Generate realistic line items that:
1. Break down the invoice into 2-4 logical items
2. Make business sense for this customer/amount
3. Sum to match the invoice Amount
4. Include relevant service descriptions

Output ONLY the JSON array, no other text.
```

---

## Integration with Dashboard

### How the Dashboard Processes Line Items Data

1. **Fetch CSV** from Google Sheet
2. **Parse CSV** and extract Line Items Data column value
3. **JSON.parse()** the string into a JavaScript array
4. **Validate** each item has description, quantity, unitPrice
5. **Display** in invoice detail drawer with formatting
6. **Calculate** subtotals and totals automatically

### Dashboard Display Format

The drawer shows:

```
LINE ITEMS
┌────────────────────┬─────┬──────────┬─────────┐
│ Description        │ Qty │ Unit Pri │ Total   │
├────────────────────┼─────┼──────────┼─────────┤
│ Professional Svc   │  5  │ ₦32.07M  │ ₦160.3M │
│ Software License   │  1  │ ₦160.3M  │ ₦160.3M │
└────────────────────┴─────┴──────────┴─────────┘

Subtotal:           ₦320,683,012.50
VAT (7.5%):         ₦22,349,512.50
─────────────────────────────────────
Total:              ₦320,683,012.50
```

---

## Testing Your JSON

### Quick Validation Checklist

Before adding to CSV, verify:

- [ ] Valid JSON (use jsonlint.com to test)
- [ ] Array starts with `[` and ends with `]`
- [ ] Each item wrapped in `{}`
- [ ] All values quoted properly
- [ ] No trailing commas
- [ ] No special characters in strings (or properly escaped)
- [ ] Numbers have no commas or currency symbols
- [ ] At least 1 item in array
- [ ] All required fields present

### Test JSON in Browser Console

```javascript
const json = '[{"description":"Test","quantity":1,"unitPrice":5000}]';
try {
  const items = JSON.parse(json);
  console.log("✓ Valid JSON", items);
} catch (e) {
  console.error("✗ Invalid JSON", e.message);
}
```

---

## Common Issues & Fixes

| Issue | Example | Fix |
|-------|---------|-----|
| Trailing comma | `[...}]` | Remove comma after last item |
| Unquoted keys | `{description:...}` | Quote all keys: `{"description":...}` |
| Currency symbol | `"unitPrice":"₦5000"` | Remove symbol: `"unitPrice":5000` |
| Commas in numbers | `"unitPrice":5,000` | Remove: `"unitPrice":5000` |
| Single quotes | `{'description':'...'}` | Use double quotes: `{"description":"..."}` |
| Empty array | `[]` | Add at least one item |
| Missing fields | `{"description":"X"}` | Add `quantity` and `unitPrice` |

---

## CSV Import Tips

### Google Sheets Formula (Optional)

If you want to auto-generate JSON in Google Sheets, use this formula pattern:

```
="["&TEXTJOIN(",",FALSE,
  "{"&CHAR(34)&"description"&CHAR(34)&":"&CHAR(34)&A2&CHAR(34)&","&
  CHAR(34)&"quantity"&CHAR(34)&":"&B2&","&
  CHAR(34)&"unitPrice"&CHAR(34)&":"&C2&"}"
)&"]"
```

(Where A=description, B=quantity, C=unitPrice)

---

## Next Steps

1. **Get your AI agent** to generate line items JSON using the prompt above
2. **Paste the JSON** into the Line Items Data column for each invoice
3. **Refresh** the dashboard to see line items displayed in the drawer
4. **Verify** calculations match your invoice amounts

---

## Questions?

If you need to modify the structure or have special requirements, update the CSV parser in:
`/lib/csv-parser.ts`

Current expected format is flexible - the parser will validate and display whatever valid JSON line items you provide.
