# Line Items Data - Quick Reference

## The Format (Copy & Paste Template)

```json
[
  {
    "description": "What you're selling/providing",
    "quantity": 1,
    "unitPrice": 50000
  },
  {
    "description": "Another item",
    "quantity": 2,
    "unitPrice": 25000
  }
]
```

## Where It Goes

**Column**: `Line Items Data` (8th column in your CSV)

**Row**: The same row as the invoice

```
Invoice # | Customer | Amount | VAT | Status | FIRS | Date | PDF Link | Line Items Data ← HERE
```

---

## Real Example

**Invoice**: INV-2026-8142  
**Amount**: ₦320,683,012.50

**Paste this in Line Items Data column**:

```json
[{"description":"Professional Consulting Services","quantity":5,"unitPrice":32068301},{"description":"Software License (Annual)","quantity":1,"unitPrice":160341507.5}]
```

**What happens**:
- Dashboard calculates: (5 × ₦32,068,301) + (1 × ₦160,341,507.5) = ₦320,683,012.50 ✓
- Drawer displays 2 line items with totals
- NGN currency formatting applied automatically

---

## Rules (Must Follow)

1. **Start with `[`** and end with **`]`** (square brackets)
2. **Each item** wrapped in `{}`  (curly braces)
3. **All fields quoted**: `"description"`, `"quantity"`, `"unitPrice"`
4. **Numbers**: No quotes, no commas, no ₦ symbol
5. **Separate items** with `,`  (comma)
6. **No trailing commas** after last item

---

## Field Details

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| description | text | `"Professional Services"` | What's being billed |
| quantity | number | `5` or `2.5` | How many units |
| unitPrice | number | `32068301` or `32068301.50` | Price per unit in NGN |

---

## AI Agent Prompt (Copy & Use)

```
Generate a JSON array of line items for this invoice in EXACTLY this format:

[{"description":"ITEM NAME","quantity":NUMBER,"unitPrice":NUMBER},...]

Requirements:
- Create 2-3 line items that make business sense
- Sum of (quantity × unitPrice) for ALL items = TOTAL AMOUNT
- Descriptions should be clear and professional
- Numbers must be valid (no commas, no currency symbols)
- All items together must equal: [AMOUNT]

Invoice Details:
- Invoice: [NUMBER]
- Customer: [NAME]
- Amount: [AMOUNT]
- Items should be relevant to: [CUSTOMER_TYPE]

Output ONLY the JSON array, nothing else.
```

---

## Test It (Paste in Browser Console)

```javascript
const data = '[{"description":"Test","quantity":1,"unitPrice":50000}]';
JSON.parse(data); // If no error, you're good ✓
```

---

## Common Mistakes ❌ → ✓

| Wrong | Right |
|-------|-------|
| `'description'` | `"description"` |
| `"unitPrice":"50000"` | `"unitPrice":50000` |
| `"unitPrice":"₦50000"` | `"unitPrice":50000` |
| `[{...}],` | `[{...}]` |
| `[{description:"X"}]` | `[{"description":"X","quantity":1,"unitPrice":5000}]` |
| `[]` (empty) | `[{"description":"Item","quantity":1,"unitPrice":5000}]` |

---

## Validation

Before pasting into CSV:

1. Copy the JSON
2. Go to https://jsonlint.com
3. Paste and click "Validate JSON"
4. Should say "Valid JSON" ✓
5. If error, fix and revalidate

---

## Support

See `LINE_ITEMS_SPECIFICATION.md` for:
- Full format details
- Complete examples
- Calculation formulas
- Google Sheets formula
- Troubleshooting

