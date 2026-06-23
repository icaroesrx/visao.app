import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'
import './AppLayout.css'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <div className="topbar">
          <button className="btn btn-ghost topbar-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
        </div>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
