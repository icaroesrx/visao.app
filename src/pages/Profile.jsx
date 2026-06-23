import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, LogOut, Save, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTasks } from '../contexts/TaskContext'
import './Profile.css'

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const { stats } = useTasks()
  const navigate = useNavigate()
  const [nameForm, setNameForm] = useState({ name: user?.name || '' })
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [nameSaved, setNameSaved] = useState(false)
  const [passError, setPassError] = useState('')
  const [passSaved, setPassSaved] = useState(false)

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U'

  const handleSaveName = (e) => {
    e.preventDefault()
    if (!nameForm.name.trim()) return
    // TODO: PUT /api/users/me { name: nameForm.name }
    updateUser({ name: nameForm.name })
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2500)
  }

  const handleSavePass = (e) => {
    e.preventDefault()
    setPassError('')
    if (passForm.next.length < 6) { setPassError('Nova senha deve ter pelo menos 6 caracteres.'); return }
    if (passForm.next !== passForm.confirm) { setPassError('As senhas não coincidem.'); return }
    // TODO: PUT /api/users/me/password { current: passForm.current, new: passForm.next }
    setPassSaved(true)
    setPassForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setPassSaved(false), 2500)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="profile-page animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Perfil</h1>
          <p className="page-subtitle">Gerencie suas informações e preferências</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-sidebar">
          <div className="card profile-card">
            <div className="profile-avatar-lg">{initials}</div>
            <p className="profile-name">{user?.name}</p>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-stats-row">
              <div className="profile-stat">
                <span className="profile-stat-val">{stats.total}</span>
                <span className="profile-stat-lbl">Tarefas</span>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <span className="profile-stat-val">{stats.done}</span>
                <span className="profile-stat-lbl">Concluídas</span>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <span className="profile-stat-val">{stats.in_progress}</span>
                <span className="profile-stat-lbl">Em prog.</span>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', color: 'var(--red)', marginTop: 8 }} onClick={handleLogout}>
              <LogOut size={15} /> Sair da conta
            </button>
          </div>
        </div>

        <div className="profile-main">
          <div className="card" style={{ marginBottom: 20 }}>
            <h2 className="section-title"><User size={16} /> Informações Pessoais</h2>
            <form onSubmit={handleSaveName} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="label">Nome</label>
                <input className="input-field" value={nameForm.name} onChange={e => setNameForm({ name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="label">E-mail</label>
                <div style={{ position: 'relative' }}>
                  <input className="input-field" value={user?.email} readOnly style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--text-3)' }}>Verificado ✓</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={14} /> Salvar Nome
                </button>
                {nameSaved && <span style={{ color: 'var(--green)', fontSize: 13 }}>✓ Salvo!</span>}
              </div>
            </form>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <h2 className="section-title"><Lock size={16} /> Segurança</h2>
            <form onSubmit={handleSavePass} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {passError && <div className="auth-error">{passError}</div>}
              {passSaved && <div className="auth-success">Senha atualizada com sucesso!</div>}
              <div className="form-group">
                <label className="label">Senha atual</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} className="input-field" value={passForm.current} onChange={e => setPassForm(p => ({ ...p, current: e.target.value }))} style={{ paddingRight: 40 }} required />
                  <button type="button" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} onClick={() => setShowPass(p => !p)}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="label">Nova senha</label>
                <input type="password" className="input-field" value={passForm.next} onChange={e => setPassForm(p => ({ ...p, next: e.target.value }))} required minLength={6} />
              </div>
              <div className="form-group">
                <label className="label">Confirmar nova senha</label>
                <input type="password" className="input-field" value={passForm.confirm} onChange={e => setPassForm(p => ({ ...p, confirm: e.target.value }))} required />
              </div>
              <div>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Lock size={14} /> Atualizar Senha
                </button>
              </div>
            </form>
          </div>

          <div className="card danger-zone">
            <h2 className="section-title" style={{ color: 'var(--red)' }}><Trash2 size={16} /> Zona de Perigo</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14 }}>Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Essa ação não pode ser desfeita.</p>
            <button className="btn btn-danger btn-sm">
              <Trash2 size={14} /> Excluir minha conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
