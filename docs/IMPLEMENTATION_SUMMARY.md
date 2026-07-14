# Invoice Dashboard - Line Items Implementation Summary

## What's Ready

Your fintech dashboard is now fully configured to accept **Line Items Data** as properly formatted JSON through your Google Sheets CSV.

---

## How It Works

### Current Flow

1. **Google Sheet CSV** contains your invoice data with 8 columns + 1 new column
2. **Dashboard fetches** the live CSV every page load
3. **Parser reads** the "Line Items Data" column (contains JSON)
4. **JSON.parse()** converts the string to a JavaScript array
5. **Dashboard displays** line items in the invoice detail drawer
6. **All formatting** (currency, calculations) happens automatically

### What Shows in the Drawer

When you click an invoice, you see:

```
┌─────────────────────────────────────────────────────────┐
│ INVOICE DETAILS                                         │
│ Invoice: INV-2026-8142 | Customer: Apex Fintech Ltd    │
│ Date: 7/12/2026 | Status: pending                       │
├─────────────────────────────────────────────────────────┤
│ LINE ITEMS                              [VIEW PDF BUTTON]
├───────────────────────┬─────┬──────────┬────────────────┤
│ Description           │ Qty │ Unit Pri │ Total          │
├───────────────────────┼─────┼──────────┼────────────────┤
│ Professional Services │  5  │ ₦32.07M  │ ₦160,341,505   │
│ Software License      │  1  │ ₦160.3M  │ ₦160,341,507.5 │
├───────────────────────┴─────┴──────────┴────────────────┤
│ Subtotal:                         ₦320,683,012.50      │
│ VAT (7.5%):                       ₦22,349,512.50       │
│ TOTAL:                            ₦320,683,012.50      │
└────────────────────────────────────────────────────────┘
```

---

## What You Need to Do

### Step 1: Format Your Line Items as JSON

Use this format exactly:

```json
[
  {
    "description": "What you're selling",
    "quantity": 1,
    "unitPrice": 50000
  },
  {
    "description": "Something else",
    "quantity": 2,
    "unitPrice": 25000
  }
]
```

**Rules:**
- Square brackets `[]` wrap the entire array
- Curly braces `{}` wrap each item
- Quote all keys and text values: `"key":"value"`
- Numbers have no quotes: `"quantity":5` not `"quantity":"5"`
- No commas after currency symbols
- No trailing commas on last item

### Step 2: Paste in Google Sheet

Place the JSON in the **Line Items Data** column for each invoice:

| Invoice # | Customer | Amount | VAT | Status | FIRS | Date | PDF Link | **Line Items Data** |
|-----------|----------|--------|-----|--------|------|------|----------|---|
| INV-2026-8142 | Apex Fintech | 320,683,012.50 | ... | pending | pending | 7/12/2026 | https://... | `[{"description":"Professional Services","quantity":5,"unitPrice":32068301},...]` |

### Step 3: Refresh Dashboard

The dashboard automatically:
- Fetches the latest CSV
- Parses all line items
- Formats currency as NGN (Nigerian Naira)
- Calculates subtotals and totals
- Displays in the drawer

---

## Use Your AI Agent

You can automate this step. Use the prompt in `docs/LINE_ITEMS_QUICK_REFERENCE.md` with your AI agent:

1. Give your agent the **invoice details** (amount, customer, date)
2. Give it the **prompt template** from LINE_ITEMS_QUICK_REFERENCE.md
3. It generates the **JSON array**
4. You paste it in the **Line Items Data** column

---

## Examples

### Single Line Item (Simple Service)

```json
[
  {
    "description": "Professional Consulting Services",
    "quantity": 1,
    "unitPrice": 500000
  }
]
```

### Multiple Items (Most Common)

```json
[
  {
    "description": "Software Development (100 hours)",
    "quantity": 1,
    "unitPrice": 5000000
  },
  {
    "description": "Project Management",
    "quantity": 3,
    "unitPrice": 1500000
  },
  {
    "description": "Training & Deployment",
    "quantity": 1,
    "unitPrice": 750000
  }
]
```

### Bulk Purchase

```json
[
  {
    "description": "Premium Software Licenses",
    "quantity": 50,
    "unitPrice": 150000
  },
  {
    "description": "Implementation",
    "quantity": 1,
    "unitPrice": 1000000
  }
]
```

---

## Validation

Before pasting into your Google Sheet:

1. Copy your JSON
2. Go to **https://jsonlint.com**
3. Paste the JSON
4. Click "Validate JSON"
5. Should show: **Valid JSON** ✓

---

## Dashboard Automatic Calculations

The dashboard **always calculates** these automatically:

```
Subtotal = SUM(quantity × unitPrice) for all items

Tax Amount = Subtotal × 7.5%

Invoice Total = Subtotal + Tax Amount
```

The **Invoice Total must match** the "Amount" column in your CSV.

---

## CSV Column Structure

Your Google Sheet should have exactly these columns:

| Column | Name | Required | Format |
|--------|------|----------|--------|
| 1 | Invoice # | Yes | Text (e.g., INV-2026-8142) |
| 2 | Customer | Yes | Text |
| 3 | Amount | Yes | Number (NGN, no commas) |
| 4 | VAT | Yes | Number (NGN, no commas) |
| 5 | Status | Yes | pending / submitted / approved / rejected |
| 6 | FIRS | Yes | pending / submitted / approved / rejected |
| 7 | Date | Yes | Date (MM/DD/YYYY) |
| 8 | PDF Link | Yes | URL to PDF file |
| **9** | **Line Items Data** | **Yes** | **JSON array** |

---

## Troubleshooting

### Line Items Not Showing?

1. Check JSON is **valid** (use jsonlint.com)
2. Verify **all fields** present: description, quantity, unitPrice
3. Ensure **column name** is exactly "Line Items Data"
4. Make sure **no empty cells** - each invoice needs JSON

### JSON Parse Error?

- Check for **unmatched quotes**
- Verify **no commas** in numbers (1000 not 1,000)
- Ensure **no special characters** unless escaped
- Look for **missing colons** between key and value

### Currency Formatting Wrong?

- Dashboard automatically displays as **NGN with commas**
- Storage should be **plain numbers**: 50000 not 50,000 not "₦50000"

---

## Files Reference

- **LINE_ITEMS_SPECIFICATION.md** - Complete technical documentation
- **LINE_ITEMS_QUICK_REFERENCE.md** - Quick guide + AI agent prompt
- **CSV_URL** - Your live sheet: https://docs.google.com/spreadsheets/d/e/2PACX-1vT7ZLPbcGn6_-3zPnd0HXuoL5-rgNSdlYTcj6JJg1qqzN-D-edl8H7pMcNzfFfGvga5iIipkILQxlM2/pub?output=csv

---

## Next Steps

1. **Open your Google Sheet** with the invoices
2. **Add the "Line Items Data" column** (9th column)
3. **Use your AI agent** to generate JSON for each invoice
4. **Paste the JSON** into each row
5. **Refresh the dashboard** - line items should appear

Done!

---

## Support Files

All documentation is in `/docs/`:

```
docs/
├── LINE_ITEMS_SPECIFICATION.md     (Full technical spec)
├── LINE_ITEMS_QUICK_REFERENCE.md   (Quick guide)
└── IMPLEMENTATION_SUMMARY.md       (This file)
```

