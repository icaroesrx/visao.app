import { useState, useEffect } from 'react'
import { X, Calendar, Flag, List } from 'lucide-react'
import { useTasks } from '../contexts/TaskContext'
import './TaskModal.css'

const PRIORITIES = [
  { value: 'low', label: 'Baixa', color: 'var(--green)' },
  { value: 'medium', label: 'Média', color: 'var(--yellow)' },
  { value: 'high', label: 'Alta', color: 'var(--red)' },
]

export default function TaskModal({ task, defaultListId, onClose }) {
  const { createTask, updateTask, lists } = useTasks()
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    listId: defaultListId || (lists[0]?.id ?? ''),
  })

  useEffect(() => {
    if (task) setForm({ ...task })
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (task) {
      updateTask(task.id, form)
    } else {
      createTask(form)
    }
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-in">
        <div className="modal-header">
          <h2>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="label">Título</label>
            <input
              className="input-field"
              placeholder="O que precisa ser feito?"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Descrição</label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Detalhes opcionais..."
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="label"><Flag size={12} style={{ display:'inline', marginRight:4 }} />Prioridade</label>
              <select className="input-field" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label"><List size={12} style={{ display:'inline', marginRight:4 }} />Lista</label>
              <select className="input-field" value={form.listId} onChange={e => setForm(p => ({ ...p, listId: Number(e.target.value) }))}>
                {lists.map(l => <option key={l.id} value={l.id}>{l.icon} {l.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="label">Status</label>
              <select className="input-field" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="todo">A Fazer</option>
                <option value="in_progress">Em Progresso</option>
                <option value="done">Concluída</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label"><Calendar size={12} style={{ display:'inline', marginRight:4 }} />Prazo</label>
              <input type="date" className="input-field" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">{task ? 'Salvar Alterações' : 'Criar Tarefa'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
