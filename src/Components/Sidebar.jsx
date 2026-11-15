import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-emerald-400 mb-10">
        FinTrack.
      </h1>

      <p className="text-xs text-slate-500 mb-4">
        MENÜ
      </p>

      <nav className="space-y-2">
        <div className="flex items-center gap-3 bg-emerald-500/15 text-emerald-400 p-3 rounded-xl">
          <LayoutDashboard size={20} />
          <span>Genel Bakış</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl">
          <ArrowLeftRight size={20} />
          <span>İşlemler</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl">
          <Wallet size={20} />
          <span>Bütçeler</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl">
          <ChartNoAxesCombined size={20} />
          <span>Analiz</span>
        </div>
      </nav>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-3 text-slate-400 p-3">
          <CircleHelp size={20} />
          <span>Yardım</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 p-3">
          <Settings size={20} />
          <span>Ayarlar</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar