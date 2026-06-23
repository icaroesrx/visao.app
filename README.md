# Visão — Sistema de Gestão de Tarefas

Frontend React completo, pronto para integrar com o backend ASP.NET.

---

## Páginas incluídas

| Página | Rota | Descrição |
|--------|------|-----------|
| Landing Page | `/` | Página inicial pública |
| Login | `/login` | Autenticação do usuário |
| Registro | `/register` | Criação de conta |
| Verificação de E-mail | `/verify-email` | Código de 6 dígitos |
| Dashboard | `/dashboard` | Visão geral e estatísticas |
| Tarefas | `/tasks` | Lista de tarefas com filtros |
| Listas | `/lists` | Gerenciamento de listas |
| Detalhe da Lista | `/lists/:id` | Tarefas de uma lista |
| Perfil | `/profile` | Dados pessoais e senha |
| Sobre | `/about` | Sobre o produto |

---

## Instalação e execução

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # produção
```

---

## Como integrar com o backend ASP.NET

Todos os lugares com dados mock estão marcados com `// TODO:` nos contextos:

### src/contexts/AuthContext.jsx
```
POST /api/auth/login              { email, password }        -> { user }
POST /api/auth/register           { name, email, password }  -> { user }
POST /api/auth/verify-email       { code }                   -> 200
POST /api/auth/resend-verification                           -> 200
GET  /api/auth/me                                            -> { user }
POST /api/auth/logout                                        -> 200
```

### src/contexts/TaskContext.jsx
```
GET    /api/tasks           -> Task[]
POST   /api/tasks           { title, description, listId, status, priority, dueDate }
PUT    /api/tasks/:id       { ...campos }
DELETE /api/tasks/:id

GET    /api/lists           -> List[]
POST   /api/lists           { name, color, icon }
PUT    /api/lists/:id       { ...campos }
DELETE /api/lists/:id
```

### src/pages/Profile.jsx
```
PUT    /api/users/me           { name }
PUT    /api/users/me/password  { current, new }
DELETE /api/users/me
```

---

## Modelos de dados

### User
```json
{ "id": 1, "name": "Nome", "email": "email@email.com", "role": "user" }
```

### Task
```json
{
  "id": 1,
  "title": "Título",
  "description": "Descrição",
  "listId": 1,
  "status": "todo | in_progress | done",
  "priority": "low | medium | high",
  "dueDate": "2026-07-01",
  "createdAt": "2026-06-20"
}
```

### List
```json
{ "id": 1, "name": "Nome", "color": "#6c63ff", "icon": "💼" }
```

---

## URL base da API

Crie um arquivo `.env` na raiz:
```
VITE_API_URL=https://sua-api.com
```

---

## Estrutura

```
src/
├── contexts/
│   ├── AuthContext.jsx     <- autenticação
│   └── TaskContext.jsx     <- tarefas e listas
├── components/
│   ├── AppLayout.jsx
│   ├── Sidebar.jsx
│   └── TaskModal.jsx
└── pages/
    ├── Landing.jsx, Login.jsx, Register.jsx, VerifyEmail.jsx
    ├── Dashboard.jsx, Tasks.jsx
    ├── Lists.jsx, ListDetail.jsx
    ├── Profile.jsx, About.jsx
```

## Tecnologias
- React 18 + Vite + React Router v6
- Lucide React (ícones)
- CSS puro com variáveis CSS (sem Tailwind, sem bibliotecas de UI)

> Para produção: substitua os blocos `// TODO:` pelos chamadas reais da API ASP.NET.
