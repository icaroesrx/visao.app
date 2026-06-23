import { createContext, useContext, useState } from 'react'

const TaskContext = createContext(null)

const MOCK_TASKS = [
  { id: 1, title: 'Definir arquitetura do backend', description: 'Planejar endpoints e modelos de dados para a API ASP.NET', listId: 1, status: 'done', priority: 'high', dueDate: '2026-06-18', createdAt: '2026-06-10' },
  { id: 2, title: 'Criar endpoints de autenticação', description: 'Login, registro, refresh token e logout', listId: 1, status: 'in_progress', priority: 'high', dueDate: '2026-06-22', createdAt: '2026-06-10' },
  { id: 3, title: 'Integrar frontend com API', description: 'Substituir mocks pelos chamadas reais da API', listId: 1, status: 'todo', priority: 'medium', dueDate: '2026-06-30', createdAt: '2026-06-10' },
  { id: 4, title: 'Testes de integração', description: 'Cobrir todos os fluxos principais com testes', listId: 2, status: 'todo', priority: 'medium', dueDate: '2026-07-05', createdAt: '2026-06-10' },
  { id: 5, title: 'Deploy em produção', description: 'Configurar CI/CD e publicar', listId: 2, status: 'todo', priority: 'low', dueDate: '2026-07-15', createdAt: '2026-06-10' },
]

const MOCK_LISTS = [
  { id: 1, name: 'Desenvolvimento', color: '#6c63ff', icon: '💻' },
  { id: 2, name: 'Infraestrutura', color: '#34d399', icon: '🛠️' },
  { id: 3, name: 'Design', color: '#fbbf24', icon: '🎨' },
]

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(MOCK_TASKS)
  const [lists, setLists] = useState(MOCK_LISTS)

  // TODO: Replace all functions with real API calls to your ASP.NET backend

  const createTask = (data) => {
    // TODO: POST /api/tasks
    const newTask = { ...data, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }
    setTasks(prev => [newTask, ...prev])
    return newTask
  }

  const updateTask = (id, data) => {
    // TODO: PUT /api/tasks/:id
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }

  const deleteTask = (id) => {
    // TODO: DELETE /api/tasks/:id
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const createList = (data) => {
    // TODO: POST /api/lists
    const newList = { ...data, id: Date.now() }
    setLists(prev => [newList, ...prev])
    return newList
  }

  const updateList = (id, data) => {
    // TODO: PUT /api/lists/:id
    setLists(prev => prev.map(l => l.id === id ? { ...l, ...data } : l))
  }

  const deleteList = (id) => {
    // TODO: DELETE /api/lists/:id
    setLists(prev => prev.filter(l => l.id !== id))
    setTasks(prev => prev.filter(t => t.listId !== id))
  }

  const getTasksByList = (listId) => tasks.filter(t => t.listId === listId)

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    overdue: tasks.filter(t => t.dueDate && t.status !== 'done' && new Date(t.dueDate) < new Date()).length,
  }

  return (
    <TaskContext.Provider value={{ tasks, lists, createTask, updateTask, deleteTask, createList, updateList, deleteList, getTasksByList, stats }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)
