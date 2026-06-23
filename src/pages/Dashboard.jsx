import { CheckCircle2, Clock, AlertCircle, Plus, TrendingUp, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTasks } from '../contexts/TaskContext'
import TaskModal from '../components/TaskModal'
import './Dashboard.css'

const PRIORITY_COLORS = { high: 'red', medium: 'yellow', low: 'green' }
const PRIORITY_LABELS = { high: 'Alta', medium: 'Média', low: 'Baixa' }
const STATUS_LABELS = { todo: 'A Fazer', in_progress: 'Em Progresso', done: 'Concluída' }

export default function Dashboard() {
  const { user } = useAuth()
  const { tasks, lists, stats } = useTasks()
  const [showModal, setShowModal] = useState(false)

  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  const overdueTasks = tasks.filter(t => t.dueDate && t.status !== 'done' && new Date(t.dueDate) < new Date())
  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0

  const firstName = user?.name?.split(' ')[0] || 'usuário'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="dashboard animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">{greeting}, {firstName} 👋</h1>
          <p className="page-subtitle">Aqui está um resumo do seu progresso</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Nova Tarefa
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue"><List size={18} /></div>
          <div>
            <p className="stat-value">{stats.total}</p>
            <p className="stat-label">Total de Tarefas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-green"><CheckCircle2 size={18} /></div>
          <div>
            <p className="stat-value">{stats.done}</p>
            <p className="stat-label">Concluídas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-yellow"><Clock size={18} /></div>
          <div>
            <p className="stat-value">{stats.in_progress}</p>
            <p className="stat-label">Em Progresso</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-red"><AlertCircle size={18} /></div>
          <div>
            <p className="stat-value">{stats.overdue}</p>
            <p className="stat-label">Atrasadas</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title"><TrendingUp size={16} /> Progresso Geral</h2>
          </div>
          <div className="progress-section">
            <div className="progress-info">
              <span>{pct}% concluído</span>
              <span className="text-muted">{stats.done}/{stats.total} tarefas</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="lists-summary">
            {lists.map(list => {
              const listTasks = tasks.filter(t => t.listId === list.id)
              const listDone = listTasks.filter(t => t.status === 'done').length
              const listPct = listTasks.length ? Math.round((listDone / listTasks.length) * 100) : 0
              return (
                <Link to={`/lists/${list.id}`} key={list.id} className="list-summary-item">
                  <div className="list-summary-info">
                    <span className="list-dot" style={{ background: list.color }} />
                    <span>{list.icon} {list.name}</span>
                    <span className="text-muted">{listTasks.length} tarefas</span>
                  </div>
                  <div className="list-mini-bar">
                    <div className="list-mini-fill" style={{ width: `${listPct}%`, background: list.color }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Tarefas Recentes</h2>
            <Link to="/tasks" className="btn btn-ghost btn-sm">Ver todas</Link>
          </div>
          <div className="recent-tasks">
            {recentTasks.length === 0 && <p className="empty-hint">Nenhuma tarefa ainda. Crie a primeira!</p>}
            {recentTasks.map(task => (
              <div key={task.id} className="recent-task-item">
                <div className={`task-status-dot ${task.status === 'done' ? 'done' : task.status === 'in_progress' ? 'progress' : ''}`} />
                <div className="recent-task-info">
                  <p className={`recent-task-title ${task.status === 'done' ? 'done' : ''}`}>{task.title}</p>
                  <p className="recent-task-meta">{STATUS_LABELS[task.status]}</p>
                </div>
                <span className={`badge badge-${PRIORITY_COLORS[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
              </div>
            ))}
          </div>
        </div>

        {overdueTasks.length > 0 && (
          <div className="card overdue-card">
            <div className="card-header">
              <h2 className="card-title"><AlertCircle size={16} style={{ color: 'var(--red)' }} /> Tarefas Atrasadas</h2>
            </div>
            <div className="recent-tasks">
              {overdueTasks.map(task => (
                <div key={task.id} className="recent-task-item">
                  <div className="task-status-dot overdue" />
                  <div className="recent-task-info">
                    <p className="recent-task-title">{task.title}</p>
                    <p className="recent-task-meta overdue-date">Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
