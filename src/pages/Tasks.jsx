import { useState } from 'react'
import { Plus, Search, Filter, CheckCircle2, Circle, Clock, Trash2, Pencil, ChevronDown } from 'lucide-react'
import { useTasks } from '../contexts/TaskContext'
import TaskModal from '../components/TaskModal'
import './Tasks.css'

const PRIORITY_COLORS = { high: 'red', medium: 'yellow', low: 'green' }
const PRIORITY_LABELS = { high: 'Alta', medium: 'Média', low: 'Baixa' }

export default function Tasks() {
  const { tasks, lists, updateTask, deleteTask } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterList, setFilterList] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = tasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== 'all' && t.status !== filterStatus) return false
    if (filterList !== 'all' && t.listId !== Number(filterList)) return false
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false
    return true
  })

  const toggleStatus = (task) => {
    const next = task.status === 'done' ? 'todo' : task.status === 'todo' ? 'in_progress' : 'done'
    updateTask(task.id, { status: next })
  }

  const getListById = (id) => lists.find(l => l.id === id)

  return (
    <div className="tasks-page animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tarefas</h1>
          <p className="page-subtitle">{filtered.length} {filtered.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditTask(null); setShowModal(true) }}>
          <Plus size={16} /> Nova Tarefa
        </button>
      </div>

      <div className="tasks-toolbar">
        <div className="search-bar">
          <Search size={15} />
          <input className="search-input" placeholder="Buscar tarefas..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className={`btn btn-secondary btn-sm ${showFilters ? 'active-filter' : ''}`} onClick={() => setShowFilters(p => !p)}>
          <Filter size={14} /> Filtros <ChevronDown size={12} />
        </button>
      </div>

      {showFilters && (
        <div className="filter-bar card animate-in">
          <div className="filter-group">
            <label className="label">Status</label>
            <select className="input-field" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">Todos</option>
              <option value="todo">A Fazer</option>
              <option value="in_progress">Em Progresso</option>
              <option value="done">Concluída</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="label">Lista</label>
            <select className="input-field" value={filterList} onChange={e => setFilterList(e.target.value)}>
              <option value="all">Todas</option>
              {lists.map(l => <option key={l.id} value={l.id}>{l.icon} {l.name}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label className="label">Prioridade</label>
            <select className="input-field" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
              <option value="all">Todas</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => { setFilterStatus('all'); setFilterList('all'); setFilterPriority('all') }}>
            Limpar
          </button>
        </div>
      )}

      <div className="task-list">
        {filtered.length === 0 && (
          <div className="empty-state card">
            <CheckCircle2 size={40} style={{ color: 'var(--text-3)', margin: '0 auto 12px' }} />
            <p>Nenhuma tarefa encontrada</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={() => setShowModal(true)}>Criar tarefa</button>
          </div>
        )}
        {filtered.map(task => {
          const list = getListById(task.listId)
          const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date()
          return (
            <div key={task.id} className={`task-item ${task.status === 'done' ? 'task-done' : ''}`}>
              <button className="task-toggle" onClick={() => toggleStatus(task)} title="Mudar status">
                {task.status === 'done'
                  ? <CheckCircle2 size={20} style={{ color: 'var(--green)' }} />
                  : task.status === 'in_progress'
                  ? <Clock size={20} style={{ color: 'var(--yellow)' }} />
                  : <Circle size={20} />}
              </button>
              <div className="task-info">
                <p className={`task-title ${task.status === 'done' ? 'done' : ''}`}>{task.title}</p>
                {task.description && <p className="task-desc">{task.description}</p>}
                <div className="task-meta">
                  {list && <span className="task-list-tag" style={{ borderColor: list.color, color: list.color }}>{list.icon} {list.name}</span>}
                  <span className={`badge badge-${PRIORITY_COLORS[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
                  {task.dueDate && (
                    <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
                      {isOverdue ? '⚠ ' : ''}{new Date(task.dueDate).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditTask(task); setShowModal(true) }} title="Editar">
                  <Pencil size={14} />
                </button>
                <button className="btn btn-ghost btn-sm task-delete" onClick={() => deleteTask(task.id)} title="Excluir">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showModal && <TaskModal task={editTask} onClose={() => { setShowModal(false); setEditTask(null) }} />}
    </div>
  )
}
