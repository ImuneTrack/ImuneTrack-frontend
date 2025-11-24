# 🩺 ImuneTrack - Frontend

## 📋 Sobre o Projeto

O **ImuneTrack** é uma aplicação web moderna para gerenciamento de calendários de vacinação, permitindo que usuários acompanhem suas vacinas, agendem doses futuras e mantenham um histórico completo de imunização.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação Completa** - Sistema de login e cadastro seguro
- 📅 **Calendário de Vacinação** - Visualização de doses programadas por data
- 💉 **Agendamento de Vacinas** - Interface intuitiva para agendar novas doses
- 📊 **Dashboard Interativo** - Estatísticas e acompanhamento em tempo real
- 📜 **Histórico Completo** - Registro detalhado de todas as vacinas
- 🌙 **Modo Escuro** - Tema claro/escuro personalizável

---

## 🚀 Tecnologias Utilizadas

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário

### UI/UX
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e não estilizados
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e consistentes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes Tailwind

### Testes
- **[Selenium WebDriver](https://www.selenium.dev/)** - Automação de testes E2E
- **[Pytest](https://pytest.org/)** - Framework de testes Python
- **[Pytest-HTML](https://github.com/pytest-dev/pytest-html)** - Relatórios HTML de testes

---

## 📁 Estrutura do Projeto

```
imunetrack-frontend/
├── app/                          # App Router do Next.js
│   ├── page.tsx                  # Página inicial (landing page)
│   ├── login/page.tsx            # Página de login
│   ├── cadastro/page.tsx         # Página de cadastro
│   ├── dashboard/page.tsx        # Dashboard principal
│   ├── layout.tsx                # Layout raiz da aplicação
│   └── globals.css               # Estilos globais e variáveis CSS
│
├── components/                   # Componentes React reutilizáveis
│   └── ui/                       # Componentes de UI
│       ├── avatar.tsx            # Avatar do usuário
│       ├── badge.tsx             # Badges/etiquetas
│       ├── button.tsx            # Botões estilizados
│       ├── calendar.tsx          # Componente de calendário
│       ├── card.tsx              # Cards/containers
│       ├── dialog.tsx            # Modais/diálogos
│       ├── dropdown-menu.tsx     # Menus dropdown
│       ├── form.tsx              # Componentes de formulário
│       ├── input.tsx             # Campos de entrada
│       ├── label.tsx             # Labels de formulário
│       ├── progress.tsx          # Barras de progresso
│       ├── select.tsx            # Seleções/dropdowns
│       ├── separator.tsx         # Separadores visuais
│       ├── settings-modal.tsx    # Modal de configurações
│       ├── sidebar.tsx           # Barra lateral de navegação
│       ├── table.tsx             # Tabelas de dados
│       ├── tabs.tsx              # Abas/tabs
│       ├── toast.tsx             # Notificações toast
│       ├── toaster.tsx           # Container de toasts
│       ├── user-list.tsx         # Lista de usuários (admin)
│       ├── user-modal.tsx        # Modal de perfil do usuário
│       ├── vaccine-calendar.tsx  # Calendário de vacinas
│       ├── vaccine-list.tsx      # Lista de vacinas do usuário
│       └── vaccine-schedule-form.tsx # Formulário de agendamento
│
├── context/                      # Contextos React
│   └── AuthContext.tsx           # Contexto de autenticação
│
├── services/                     # Serviços e integrações
│   └── api.ts                    # Cliente Axios e serviços de API
│
├── hooks/                        # Hooks personalizados
│   └── use-toast.ts              # Hook para notificações toast
│
├── lib/                          # Bibliotecas e utilitários
│   └── utils.ts                  # Funções utilitárias (cn, etc.)
│
├── public/                       # Arquivos estáticos
│   ├── logo.png                  # Logo da aplicação
│   ├── favicon.ico               # Favicon
│   └── *.svg                     # Ícones SVG
│
├── tests/                        # Testes automatizados
│   └── selenium/                 # Testes E2E com Selenium
│       ├── config/               # Configurações de teste
│       │   └── settings.py       # Configurações centralizadas
│       ├── pages/                # Page Objects
│       │   ├── base_page.py      # Classe base para pages
│       │   ├── login_page.py     # Page Object de login
│       │   ├── cadastro_page.py  # Page Object de cadastro
│       │   ├── dashboard_page.py # Page Object do dashboard
│       │   └── agendamentoVacina_page.py
│       ├── tests/                # Testes organizados
│       │   ├── 2e2/              # Testes end-to-end
│       │   │   ├── test_auth.py  # Testes de autenticação
│       │   │   ├── test_dashboard.py
│       │   │   ├── test_agendamentoVacina.py
│       │   │   └── test_vaccine_history.py
│       │   └── smoke/            # Testes de smoke
│       │       └── test_smoke.py
│       ├── utils/                # Utilitários de teste
│       │   ├── helpers.py        # Funções auxiliares
│       │   ├── waits.py          # Waits customizados
│       │   └── test_data.py      # Geração de dados de teste
│       ├── conftest.py           # Configuração de fixtures
│       ├── pytest.ini            # Configuração do Pytest
│       └── requirements.txt      # Dependências Python
│
├── reports/                      # Relatórios de testes (gerado)
│   ├── html/                     # Relatórios HTML
│   └── screenshots/              # Screenshots de falhas
│
├── .env.local                    # Variáveis de ambiente (local)
├── .env.test                     # Variáveis de ambiente (testes)
├── .gitignore                    # Arquivos ignorados pelo Git
├── components.json               # Configuração shadcn/ui
├── eslint.config.mjs             # Configuração ESLint
├── next.config.ts                # Configuração Next.js
├── package.json                  # Dependências Node.js
├── postcss.config.mjs            # Configuração PostCSS
├── tailwind.config.ts            # Configuração Tailwind CSS
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
```

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** 20+ e **npm** ou **yarn**
- **Python** 3.11+ (para testes Selenium)
- **Backend ImuneTrack** rodando (veja [ImuneTrack-backend](https://github.com/ImuneTrack/ImuneTrack-backend))

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/ImuneTrack/ImuneTrack-frontend.git
cd ImuneTrack-frontend
```

### 2️⃣ Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3️⃣ Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL do backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Outras configurações (opcional)
NEXT_PUBLIC_APP_NAME=ImuneTrack
```

### 4️⃣ Execute o Projeto

```bash
# Modo de desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

Acesse: **http://localhost:3000**

---

## 🧪 Testes Automatizados

### Configuração dos Testes

#### 1. Instale as Dependências Python

```bash
cd tests/selenium
pip install -r requirements.txt
```

#### 2. Configure as Variáveis de Ambiente de Teste

Crie `.env.test` na raiz do projeto:

```env
# URLs
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:8000
BASE_URL=http://localhost:3000

# Browser
BROWSER=chrome
HEADLESS=false
WINDOW_WIDTH=1920
WINDOW_HEIGHT=1080

# Timeouts
IMPLICIT_WAIT=10
EXPLICIT_WAIT=20
PAGE_LOAD_TIMEOUT=30

# Usuário de teste
TEST_USER_EMAIL=admin@teste.com
TEST_USER_PASSWORD=admin1
TEST_USER_NAME=admin Teste

# Features
SCREENSHOT_ON_FAILURE=true
VIDEO_RECORDING=false
SLOW_MO=0

# Debug
DEBUG=false
VERBOSE=false
```

### Executando os Testes

```bash
# Todos os testes
pytest tests/selenium/tests/ -v

# Testes específicos
pytest tests/selenium/tests/2e2/test_auth.py -v

# Testes de smoke (rápidos)
pytest tests/selenium/tests/smoke/ -v -m smoke

# Com relatório HTML
pytest tests/selenium/tests/ -v --html=reports/html/report.html --self-contained-html

# Modo headless
HEADLESS=true pytest tests/selenium/tests/ -v
```

### Estrutura dos Testes

Os testes seguem o padrão **Page Object Model (POM)** para melhor manutenibilidade:

- **Page Objects** (`pages/`) - Encapsulam a lógica de interação com páginas
- **Testes E2E** (`tests/2e2/`) - Testes completos de fluxos de usuário
- **Testes Smoke** (`tests/smoke/`) - Testes rápidos de sanidade
- **Utilitários** (`utils/`) - Funções auxiliares e geração de dados

---


## 🔐 Autenticação e Autorização

### Fluxo de Autenticação

1. Usuário faz login via `/login`
2. Credenciais são validadas pelo backend
3. Dados do usuário são armazenados no `localStorage`
4. `AuthContext` gerencia o estado de autenticação
5. Rotas protegidas verificam autenticação

### Proteção de Rotas

```typescript
// Verificação no useEffect
useEffect(() => {
  const storedUser = localStorage.getItem("user")
  if (!storedUser) router.push("/login")
  else setUser(JSON.parse(storedUser))
}, [router])
```

## 🚢 Deploy

### Render

Por meio do link
https://imunetrack-frontend.onrender.com/

### Outras Plataformas

- **Netlify** - Suporta Next.js
- **AWS Amplify** - Deploy contínuo
- **Railway** - Deploy simplificado

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use **TypeScript** para type safety
- Siga as convenções do **ESLint**
- Componentes em **PascalCase**
- Funções e variáveis em **camelCase**
- Use **React Hooks** (functional components)
- Comente código complexo


## 📞 Suporte

Encontrou um bug ou tem uma sugestão? Abra uma [issue](https://github.com/ImuneTrack/ImuneTrack-frontend/issues).

---

## 🔗 Links Úteis

- [Backend ImuneTrack](https://github.com/ImuneTrack/ImuneTrack-backend)
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação Radix UI](https://www.radix-ui.com/docs)
- [Documentação React Hook Form](https://react-hook-form.com/docs)
