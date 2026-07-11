import { TrendingUp } from "lucide-react"

interface KPI {
  totalInvoices: number
  netSales: number
  vatCollected: number
  grossSales: number
}

interface KPICardsProps {
  data: KPI
}

export default function KPICards({ data }: KPICardsProps) {
  const metrics = [
    {
      label: "Total Invoices",
      value: data.totalInvoices.toLocaleString(),
      change: "+12.5%",
      icon: "📊",
    },
    {
      label: "Net Sales",
      value: `₦${(data.netSales / 1000000).toFixed(2)}M`,
      change: "+8.2%",
      icon: "💰",
    },
    {
      label: "VAT Collected",
      value: `₦${(data.vatCollected / 1000000).toFixed(2)}M`,
      change: "+5.1%",
      icon: "📈",
    },
    {
      label: "Gross Sales",
      value: `₦${(data.grossSales / 1000000).toFixed(2)}M`,
      change: "+10.3%",
      icon: "💳",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
            </div>
            <span className="text-2xl">{metric.icon}</span>
          </div>
          <div className="flex items-center gap-1 text-success text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>{metric.change} this month</span>
          </div>
        </div>
      ))}
    </div>
  )
}
