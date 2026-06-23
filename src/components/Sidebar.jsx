import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, List, User, LogOut, Eye, Plus, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTasks } from '../contexts/TaskContext'
import { useState } from 'react'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const { lists } = useTasks()
  const navigate = useNavigate()
  const [showNewList, setShowNewList] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Eye size={22} strokeWidth={1.5} />
            <span>Visão</span>
          </div>
          <button className="btn btn-ghost btn-sm sidebar-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-section-label">Principal</p>
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <CheckSquare size={18} />
            <span>Tarefas</span>
          </NavLink>
          <NavLink to="/lists" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <List size={18} />
            <span>Listas</span>
          </NavLink>

          <div className="sidebar-divider" />

          <div className="sidebar-section-header">
            <p className="sidebar-section-label">Minhas Listas</p>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowNewList(true)} title="Nova lista">
              <Plus size={14} />
            </button>
          </div>
          {lists.map(list => (
            <NavLink key={list.id} to={`/lists/${list.id}`} className={({ isActive }) => `sidebar-link sidebar-list-link ${isActive ? 'active' : ''}`} onClick={onClose}>
              <span className="list-dot" style={{ background: list.color }}></span>
              <span>{list.icon} {list.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <User size={18} />
            <span>Perfil</span>
          </NavLink>
          <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            <div>
              <p className="sidebar-user-name">{user?.name}</p>
              <p className="sidebar-user-email">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
