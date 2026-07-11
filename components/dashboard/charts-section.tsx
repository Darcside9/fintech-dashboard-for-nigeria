"use client"

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  submissionStatus: Array<{ name: string; value: number; color: string }>
  weeklyVat: Array<{ week: string; amount: number }>
}

interface ChartsSectionProps {
  data: {
    charts: ChartData
  }
}

export default function ChartsSection({ data }: ChartsSectionProps) {
  const COLORS = ["#1f7fb8", "#4ba3c3", "#f0ad4e", "#d9534f"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* FIRS Submission Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">FIRS Submission Status</CardTitle>
          <CardDescription>Invoice submission breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.charts.submissionStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.charts.submissionStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly VAT Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Weekly VAT Collection</CardTitle>
          <CardDescription>7-day VAT trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.charts.weeklyVat}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                }}
              />
              <Bar dataKey="amount" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
