import { Eye, GitBranch, Globe, Mail, Zap, Shield, CheckCheck } from 'lucide-react'
import './About.css'

const STACK = [
  { name: 'React', desc: 'Interface do usuário' },
  { name: 'Vite', desc: 'Build tool rápido' },
  { name: 'React Router', desc: 'Navegação SPA' },
  { name: 'ASP.NET', desc: 'Backend & API REST' },
  { name: 'Lucide Icons', desc: 'Ícones modernos' },
]

const VALUES = [
  { icon: CheckCheck, title: 'Clareza', desc: 'Cada decisão de design prioriza entender rapidamente o que importa.' },
  { icon: Zap, title: 'Velocidade', desc: 'Interface leve e rápida — sem animações desnecessárias, sem bloqueios.' },
  { icon: Shield, title: 'Confiança', desc: 'Seus dados são seus. Autenticação segura e sem rastreamento.' },
]

export default function About() {
  return (
    <div className="about-page animate-in">
      <div className="about-hero">
        <div className="about-logo">
          <Eye size={36} strokeWidth={1.5} />
        </div>
        <h1 className="about-title">Sobre o Visão</h1>
        <p className="about-subtitle">
          Uma ferramenta de gestão de tarefas construída com simplicidade e eficiência como princípios centrais.
        </p>
      </div>

      <div className="about-grid">
        <section className="card about-section">
          <h2 className="about-section-title">Nossa missão</h2>
          <p className="about-text">
            O Visão nasceu da frustração com ferramentas de produtividade que complicam mais do que ajudam. 
            Queremos que você foque no que realmente importa — fazer as coisas acontecerem — sem precisar 
            aprender um sistema complexo antes.
          </p>
          <p className="about-text">
            Gerenciar tarefas deve ser simples, rápido e até agradável. Cada elemento da interface foi 
            pensado para reduzir o atrito entre você e o seu trabalho.
          </p>
        </section>

        <section className="card about-section">
          <h2 className="about-section-title">Valores</h2>
          <div className="values-list">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="value-item">
                <div className="value-icon"><Icon size={18} /></div>
                <div>
                  <p className="value-title">{title}</p>
                  <p className="value-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card about-section">
          <h2 className="about-section-title">Tecnologia</h2>
          <p className="about-text" style={{ marginBottom: 16 }}>
            Construído com tecnologias modernas para máxima performance e confiabilidade.
          </p>
          <div className="stack-list">
            {STACK.map(({ name, desc }) => (
              <div key={name} className="stack-item">
                <span className="stack-name">{name}</span>
                <span className="stack-desc">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card about-section contact-section">
          <h2 className="about-section-title">Contato</h2>
          <p className="about-text">Tem alguma sugestão ou encontrou um problema?</p>
          <div className="contact-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <GitBranch size={16} /> GitHub
            </a>
            <a href="mailto:contato@visao.app" className="contact-link">
              <Mail size={16} /> contato@visao.app
            </a>
            <a href="https://visao.app" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Globe size={16} /> visao.app
            </a>
          </div>
        </section>
      </div>

      <div className="about-footer">
        <div className="about-version">
          <span className="badge badge-purple">v1.0.0</span>
          <span className="about-footer-text">Feito com foco e cuidado · © 2026 Visão</span>
        </div>
      </div>
    </div>
  )
}
