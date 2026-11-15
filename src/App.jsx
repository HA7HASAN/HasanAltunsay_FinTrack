import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default App