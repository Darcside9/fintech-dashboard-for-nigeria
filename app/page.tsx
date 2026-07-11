import DashboardHeader from "@/components/dashboard/header"
import KPICards from "@/components/dashboard/kpi-cards"
import ChartsSection from "@/components/dashboard/charts-section"
import InvoiceTable from "@/components/dashboard/invoice-table"
import { getInvoiceData } from "@/lib/api"

export default async function Dashboard() {
  const data = await getInvoiceData()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        <KPICards data={data.kpis} />
        <ChartsSection data={data} />
        <InvoiceTable invoices={data.invoices} />
      </main>
    </div>
  )
}
