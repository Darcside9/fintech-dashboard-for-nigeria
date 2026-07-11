import { Building2, Shield } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">e-Invoice Portal</h1>
              <p className="text-sm text-muted-foreground">FIRS Compliant Invoicing System</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Compliant</span>
          </div>
        </div>
      </div>
    </header>
  )
}
