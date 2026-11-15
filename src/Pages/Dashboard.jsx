
import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Pencil,
  Search,
} from 'lucide-react'

import TransactionForm from '../Components/TransactionForm'
import FinanceChart from '../Components/FinanceChart'

function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  // İşlemleri tarayıcı hafızasından yükle
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('fintrack_transactions')

    if (savedTransactions) {
      return JSON.parse(savedTransactions)
    }

    return [
      {
        id: 1,
        title: 'Maaş',
        amount: 25000,
        type: 'income',
        category: 'Maaş',
        date: '2026-11-01',
      },
      {
        id: 2,
        title: 'Market',
        amount: 1250,
        type: 'expense',
        category: 'Market',
        date: '2026-11-01',
      },
      {
        id: 3,
        title: 'Ulaşım',
        amount: 450,
        type: 'expense',
        category: 'Ulaşım',
        date: '2026-11-01',
      },
    ]
  })

  // İşlemler değiştiğinde otomatik kaydet
  useEffect(() => {
    localStorage.setItem(
      'fintrack_transactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  // Yeni işlem ekle
  function addTransaction(newTransaction) {
    setTransactions((previous) => [
      newTransaction,
      ...previous,
    ])
    setShowForm(false)
  }

  // İşlem sil
  function deleteTransaction(id) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    )
  }

  // İşlem güncelle
  function updateTransaction(updatedTransaction) {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    )
    setEditingTransaction(null)
  }

  // Gelirleri hesapla
  const totalIncome = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0)

  // Giderleri hesapla
  const totalExpense = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0)

  const balance = totalIncome - totalExpense

  // Arama ve kategori filtreleme
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLocaleLowerCase('tr-TR')
      .includes(searchTerm.toLocaleLowerCase('tr-TR'))

    const matchesCategory =
      selectedCategory === 'Tümü' ||
      transaction.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Tutarları Türk Lirası biçiminde göster
  const money = (amount) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount)

  return (
    <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">

      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Genel Bakış
          </h2>
          <p className="text-slate-500 mt-1">
            Finansal durumunu buradan takip edebilirsin.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-medium"
        >
          <Plus size={18} />
          Yeni İşlem
        </button>
      </div>

      {/* Finansal özet kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Toplam Bakiye</span>
            <Wallet className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-4">
            {money(balance)}
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Gelirlerden giderler çıkarıldı.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Toplam Gelir</span>
            <TrendingUp className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-4">
            {money(totalIncome)}
          </h3>
          <p className="text-sm text-emerald-600 mt-2">
            <ArrowUpRight size={15} className="inline" /> Gelir toplamı
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Toplam Gider</span>
            <TrendingDown className="text-rose-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-4">
            {money(totalExpense)}
          </h3>
          <p className="text-sm text-rose-500 mt-2">
            <ArrowDownRight size={15} className="inline" /> Gider toplamı
          </p>
        </div>

      </div>

      {/* Gelir gider grafiği */}
      <FinanceChart
        income={totalIncome}
        expense={totalExpense}
      />

      {/* İşlem listesi */}
      <section className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">

        <div className="mb-5">
          <h3 className="font-semibold text-slate-800 text-lg mb-4">
            Son İşlemler
          </h3>

          {/* Arama ve kategori filtreleri */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="İşlem ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Tümü">Tüm Kategoriler</option>
              <option value="Maaş">Maaş</option>
              <option value="Market">Market</option>
              <option value="Ulaşım">Ulaşım</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              {transactions.length === 0
                ? 'Henüz işlem eklenmedi.'
                : 'Aramanla eşleşen işlem bulunamadı.'}
            </p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 pb-4"
              >
                <div>
                  <p className="font-medium text-slate-700">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={
                      transaction.type === 'income'
                        ? 'text-emerald-600 font-semibold'
                        : 'text-rose-500 font-semibold'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {money(transaction.amount)}
                  </span>

                  <button
                    onClick={() => setEditingTransaction(transaction)}
                    className="text-slate-400 hover:text-emerald-500"
                    title="İşlemi düzenle"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-slate-400 hover:text-rose-500"
                    title="İşlemi sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* İşlem ekleme ve düzenleme formu */}
      {(showForm || editingTransaction) && (
        <TransactionForm
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          initialTransaction={editingTransaction}
          onCancel={() => {
            setShowForm(false)
            setEditingTransaction(null)
          }}
        />
      )}

    </main>
  )
}

export default Dashboard
