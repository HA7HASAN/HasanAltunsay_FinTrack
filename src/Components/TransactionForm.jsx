
import { useState } from 'react'
import { X, PlusCircle } from 'lucide-react'

function TransactionForm({
  onAdd,
  onUpdate,
  onCancel,
  initialTransaction = null,
}) {
  const [title, setTitle] = useState(initialTransaction?.title ?? '')
  const [amount, setAmount] = useState(
    initialTransaction?.amount?.toString() ?? ''
  )
  const [type, setType] = useState(initialTransaction?.type ?? 'expense')
  const [category, setCategory] = useState(
    initialTransaction?.category ?? 'Market'
  )
  const [date, setDate] = useState(
    initialTransaction?.date ?? new Date().toISOString().split('T')[0]
  )

  function handleSubmit(e) {
    e.preventDefault()

    const transactionData = {
      id: initialTransaction?.id ?? Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date,
    }

    if (initialTransaction) {
      onUpdate(transactionData)
    } else {
      onAdd(transactionData)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {initialTransaction ? 'İşlemi Düzenle' : 'Yeni İşlem Ekle'}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              İşlem Adı
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn. Market alışverişi"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tutar (₺)
            </label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Örn. 1500"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              İşlem Türü
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
            >
              <option value="expense">Gider</option>
              <option value="income">Gelir</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
            >
              <option>Market</option>
              <option>Ulaşım</option>
              <option>Eğitim</option>
              <option>Maaş</option>
              <option>Fatura</option>
              <option>Sağlık</option>
              <option>Eğlence</option>
              <option>Diğer</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tarih
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 p-3 font-semibold text-white hover:bg-emerald-600"
          >
            <PlusCircle size={19} />
            {initialTransaction ? 'Değişiklikleri Kaydet' : 'İşlemi Kaydet'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default TransactionForm
