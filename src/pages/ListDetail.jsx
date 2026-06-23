import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Plus, ArrowLeft, CheckCircle2, Circle, Clock, Trash2, Pencil } from 'lucide-react'
import { useTasks } from '../contexts/TaskContext'
import TaskModal from '../components/TaskModal'
import './Tasks.css'

const PRIORITY_COLORS = { high: 'red', medium: 'yellow', low: 'green' }
const PRIORITY_LABELS = { high: 'Alta', medium: 'Média', low: 'Baixa' }

export default function ListDetail() {
  const { id } = useParams()
  const { lists, tasks, updateTask, deleteTask } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const list = lists.find(l => l.id === Number(id))
  if (!list) return <Navigate to="/lists" />

  const listTasks = tasks.filter(t => t.listId === list.id)
  const done = listTasks.filter(t => t.status === 'done').length
  const pct = listTasks.length ? Math.round((done / listTasks.length) * 100) : 0

  const toggleStatus = (task) => {
    const next = task.status === 'done' ? 'todo' : task.status === 'todo' ? 'in_progress' : 'done'
    updateTask(task.id, { status: next })
  }

  return (
    <div className="tasks-page animate-in">
      <div style={{ marginBottom: 20 }}>
        <Link to="/lists" className="btn btn-ghost btn-sm" style={{ marginBottom: 12, paddingLeft: 0 }}>
          <ArrowLeft size={14} /> Voltar às listas
        </Link>
        <div className="page-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>{list.icon}</span>
              <h1 className="page-title" style={{ marginBottom: 0 }}>{list.name}</h1>
            </div>
            <p className="page-subtitle">{done}/{listTasks.length} tarefas concluídas</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditTask(null); setShowModal(true) }}>
            <Plus size={16} /> Nova Tarefa
          </button>
        </div>
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div className="progress-fill" style={{ width: `${pct}%`, background: list.color }} />
        </div>
      </div>

      <div className="task-list">
        {listTasks.length === 0 && (
          <div className="empty-state card">
            <p>Esta lista está vazia.</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={() => setShowModal(true)}>Adicionar tarefa</button>
          </div>
        )}
        {listTasks.map(task => {
          const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date()
          return (
            <div key={task.id} className={`task-item ${task.status === 'done' ? 'task-done' : ''}`}>
              <button className="task-toggle" onClick={() => toggleStatus(task)}>
                {task.status === 'done' ? <CheckCircle2 size={20} style={{ color: list.color }} />
                  : task.status === 'in_progress' ? <Clock size={20} style={{ color: 'var(--yellow)' }} />
                  : <Circle size={20} />}
              </button>
              <div className="task-info">
                <p className={`task-title ${task.status === 'done' ? 'done' : ''}`}>{task.title}</p>
                {task.description && <p className="task-desc">{task.description}</p>}
                <div className="task-meta">
                  <span className={`badge badge-${PRIORITY_COLORS[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
                  {task.dueDate && <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>{isOverdue ? '⚠ ' : ''}{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>}
                </div>
              </div>
              <div className="task-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditTask(task); setShowModal(true) }}><Pencil size={14} /></button>
                <button className="btn btn-ghost btn-sm task-delete" onClick={() => deleteTask(task.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          )
        })}
      </div>

      {showModal && <TaskModal task={editTask} defaultListId={list.id} onClose={() => { setShowModal(false); setEditTask(null) }} />}
    </div>
  )
}
