"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import InvoiceDetailDrawer from "./invoice-detail-drawer"

interface Invoice {
  id: string
  invoiceNumber: string
  customer: string
  amount: number
  vatAmount: number
  status: "submitted" | "pending" | "rejected" | "approved"
  submissionDate: string
  firsStatus: string
  lineItems: Array<{ description: string; quantity: number; unitPrice: number }>
  firsLogs: Array<{ timestamp: string; event: string; status: string }>
}

interface InvoiceTableProps {
  invoices: Invoice[]
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const getStatusBadge = (status: string) => {
    const styles = {
      submitted: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      rejected: "bg-error/10 text-error border-error/20",
      approved: "bg-success/10 text-success border-success/20",
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recent Invoices</CardTitle>
          <CardDescription>Latest invoice submissions and FIRS status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Invoice #</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Customer</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">VAT</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">FIRS</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-foreground">{invoice.invoiceNumber}</td>
                    <td className="py-4 px-4 text-foreground">{invoice.customer}</td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      ₦{(invoice.amount / 1000000).toFixed(2)}M
                    </td>
                    <td className="py-4 px-4 text-right text-muted-foreground">
                      ₦{(invoice.vatAmount / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(invoice.status)}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(invoice.firsStatus)}`}
                      >
                        {invoice.firsStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">
                      {new Date(invoice.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedInvoice && <InvoiceDetailDrawer invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
    </>
  )
}
