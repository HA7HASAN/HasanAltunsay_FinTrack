
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

function FinanceChart({ income, expense }) {
  const data = [
    {
      name: 'Finansal Durum',
      Gelir: income,
      Gider: expense,
    },
  ]

  const money = (amount) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Gelir ve Gider Analizi
      </h3>

      <p className="text-sm text-slate-500 mb-6">
        Toplam gelir ve giderlerinin karşılaştırması.
      </p>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip formatter={(value) => money(value)} />
            <Legend />

            <Bar
              dataKey="Gelir"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="Gider"
              fill="#f43f5e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default FinanceChart
