import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useTasks } from '../contexts/TaskContext'
import './Lists.css'

const COLORS = ['#6c63ff', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#fb923c', '#2dd4bf']
const ICONS = ['💼', '🏠', '📚', '🎯', '💡', '🛠️', '🎨', '🌟', '💻', '📋', '⚡', '🔮']

export default function Lists() {
  const { lists, tasks, createList, updateList, deleteList } = useTasks()
  const [showNew, setShowNew] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ name: '', color: COLORS[0], icon: '💼' })

  const handleCreate = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    createList(form)
    setForm({ name: '', color: COLORS[0], icon: '💼' })
    setShowNew(false)
  }

  const handleEdit = (list) => {
    setEditId(list.id)
    setForm({ name: list.name, color: list.color, icon: list.icon })
  }

  const handleSaveEdit = (id) => {
    if (!form.name.trim()) return
    updateList(id, form)
    setEditId(null)
  }

  return (
    <div className="lists-page animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Listas</h1>
          <p className="page-subtitle">{lists.length} {lists.length === 1 ? 'lista' : 'listas'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>
          <Plus size={16} /> Nova Lista
        </button>
      </div>

      {showNew && (
        <div className="card new-list-form animate-in">
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16 }}>Nova Lista</h3>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="label">Nome</label>
                <input className="input-field" placeholder="Nome da lista" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} autoFocus />
              </div>
              <div className="form-group">
                <label className="label">Ícone</label>
                <div className="icon-picker">{ICONS.map(ic => (
                  <button key={ic} type="button" className={`icon-btn ${form.icon === ic ? 'selected' : ''}`} onClick={() => setForm(p => ({ ...p, icon: ic }))}>{ic}</button>
                ))}</div>
              </div>
              <div className="form-group">
                <label className="label">Cor</label>
                <div className="color-picker">{COLORS.map(c => (
                  <button key={c} type="button" className={`color-btn ${form.color === c ? 'selected' : ''}`} style={{ background: c }} onClick={() => setForm(p => ({ ...p, color: c }))} />
                ))}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowNew(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Criar Lista</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="lists-grid">
        {lists.map(list => {
          const listTasks = tasks.filter(t => t.listId === list.id)
          const done = listTasks.filter(t => t.status === 'done').length
          const pct = listTasks.length ? Math.round((done / listTasks.length) * 100) : 0
          const isEditing = editId === list.id
          return (
            <div key={list.id} className="list-card card" style={{ borderColor: isEditing ? list.color : undefined }}>
              <div className="list-card-header">
                {isEditing ? (
                  <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input className="input-field" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={{ flex: 1 }} />
                    <button className="btn btn-ghost btn-sm" onClick={() => handleSaveEdit(list.id)}><Check size={14} /></button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditId(null)}><X size={14} /></button>
                  </div>
                ) : (
                  <>
                    <div className="list-card-title">
                      <span className="list-card-icon" style={{ background: `${list.color}20` }}>{list.icon}</span>
                      <span>{list.name}</span>
                    </div>
                    <div className="list-card-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(list)}><Pencil size={13} /></button>
                      <button className="btn btn-ghost btn-sm list-delete" onClick={() => deleteList(list.id)}><Trash2 size={13} /></button>
                    </div>
                  </>
                )}
              </div>
              <div className="list-card-stats">
                <span>{listTasks.length} tarefas</span>
                <span>{done} concluídas</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 12 }}>
                <div className="progress-fill" style={{ width: `${pct}%`, background: list.color }} />
              </div>
              <Link to={`/lists/${list.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Ver tarefas
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
