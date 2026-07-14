"use client"

import { X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

interface FIRSLog {
  timestamp: string
  event: string
  status: string
}

interface Invoice {
  id: string
  invoiceNumber: string
  customer: string
  amount: number
  vatAmount: number
  status: string
  submissionDate: string
  firsStatus: string
  pdfLink: string
  lineItems: LineItem[]
  firsLogs: FIRSLog[]
}

interface InvoiceDetailDrawerProps {
  invoice: Invoice
  onClose: () => void
}

export default function InvoiceDetailDrawer({ invoice, onClose }: InvoiceDetailDrawerProps) {
  const totalLineItems = invoice.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="w-full max-w-2xl bg-card shadow-xl overflow-y-auto">
        <div className="sticky top-0 border-b border-border bg-card p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Invoice Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Invoice Header Info */}
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Invoice Number</p>
              <p className="text-lg font-bold text-foreground mt-1">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Customer</p>
              <p className="text-lg font-bold text-foreground mt-1">{invoice.customer}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Submission Date</p>
              <p className="text-sm text-foreground mt-1">{new Date(invoice.submissionDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Status</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-success/10 text-success border-success/20 mt-1">
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Line Items</h3>
              {invoice.pdfLink && (
                <a href={invoice.pdfLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="w-4 h-4" />
                    View PDF
                  </Button>
                </a>
              )}
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Description</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Qty</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Unit Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.length > 0 ? (
                    invoice.lineItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{item.description}</td>
                        <td className="py-3 px-4 text-right text-foreground">{item.quantity}</td>
                        <td className="py-3 px-4 text-right text-foreground">₦{item.unitPrice.toLocaleString('en-NG')}</td>
                        <td className="py-3 px-4 text-right font-medium text-foreground">
                          ₦{(item.quantity * item.unitPrice).toLocaleString('en-NG')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-muted-foreground">
                        No line items available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-2 text-right">
              <div className="flex justify-end gap-8">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium text-foreground w-32">₦{totalLineItems.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-end gap-8 py-2 border-t border-border">
                <span className="font-semibold text-foreground">VAT (7.5%):</span>
                <span className="font-bold text-success w-32">₦{invoice.vatAmount.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-end gap-8 py-2 bg-primary/10 px-4 rounded">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="font-bold text-primary w-32">₦{invoice.amount.toLocaleString('en-NG')}</span>
              </div>
            </div>
          </div>

          {/* FIRS Submission Logs */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">FIRS Submission Log</h3>
            <div className="space-y-3">
              {invoice.firsLogs.map((log, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{log.event}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        log.status === "success"
                          ? "bg-success/10 text-success"
                          : log.status === "pending"
                            ? "bg-warning/10 text-warning"
                            : "bg-error/10 text-error"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
