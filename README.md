# 📦 ENW Inventory (EyesNwhere)

Um sistema de gestão de inventário de TI moderno, rápido e seguro. Desenvolvido para gerir equipamentos corporativos, acompanhar o ciclo de vida do hardware, registar reparos e gerir perfis de acesso administrativo.

---

## ✨ Funcionalidades

### 💻 Visão Geral (Dashboard)
- **Grelha de Equipamentos:** Visualização em cartões estilizados de todo o parque informático.
- **Filtros em Tempo Real:** Pesquisa instantânea cruzada por Usuário, Patrimônio e Número de Série.
- **Alertas Visuais:** Indicação automática de "Troca Recomendada" para hardware com 4+ anos de uso.
- **Modal de Detalhes:** Visualização completa e imersiva de todas as especificações e dados do utilizador.
- **Exportação Inteligente:** Geração de relatórios em Excel (`.xlsx`) estilizados, respeitando os filtros ativos.

### 🛡️ Painel de Administração & Segurança
- **Autenticação Segura:** Sistema de Login protegido via NextAuth.js com senhas criptografadas (Bcrypt).
- **Setup Automático:** O sistema deteta se o banco de dados está vazio e guia a criação do primeiro Administrador.
- **Gestão de Equipamentos:** Cadastro (com prevenção de duplicados), edição, exclusão e contagem de reparos com 1 clique.
- **Gestão de Acessos:** Aba dedicada para criar novos administradores, editar e remover acessos.
- **Proteção Anti-Lockout:** Lógicas de segurança que impedem o administrador de excluir o próprio perfil.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as tecnologias mais modernas do ecossistema JavaScript/TypeScript:

* **[Next.js](https://nextjs.org/)** - Framework React (App Router, Server Actions)
* **[Tailwind CSS](https://tailwindcss.com/)** - Estilização e Design Responsivo
* **[Prisma ORM](https://www.prisma.io/)** - Comunicação com o Banco de Dados
* **[SQLite](https://sqlite.org/)** - Banco de dados leve e rápido
* **[NextAuth.js](https://next-auth.js.org/)** - Autenticação e Segurança
* **[ExcelJS](https://github.com/exceljs/exceljs)** - Geração de relatórios Excel formatados
* **[Lucide React](https://lucide.dev/)** - Biblioteca de Ícones

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado na sua máquina.

### 1. Instalação
Clone este repositório e instale as dependências:


```bash
git clone [https://github.com/seu-usuario/enw-inventory.git](https://github.com/seu-usuario/enw-inventory.git)

cd enw-inventory

npm install
```

### 2. Configuração de Variáveis de Ambiente
Crie ou edite o ficheiro .env na raiz do projeto e adicione a chave de segurança para as sessões:


```bash
NEXTAUTH_SECRET="sua-chave-super-secreta-e-segura-aqui"

NEXTAUTH_URL="http://localhost:3000"
```

### 3. Configuração do Banco de Dados
Gere os modelos e sincronize o banco de dados SQLite:

```bash
npx prisma generate

npx prisma db push
```

### 4. Executar a Aplicação
Inicie o servidor de desenvolvimento:

```bash
npm run dev

Abra o seu navegador em http://localhost:3000.
```
``(Dica: Para permitir acesso via rede local, inicie com npm run dev -- -H 0.0.0.0)``

---

## 🔑 Primeiro Acesso
Ao iniciar o projeto com um banco de dados limpo, clique em "Painel Admin".

O sistema detetará automaticamente que não há administradores.

Preencha o formulário para criar o seu Primeiro Perfil de Administrador.

Faça o login e comece a cadastrar os seus equipamentos!

## 🤝 Suporte
Sistema desenvolvido internamente. Para dúvidas ou suporte técnico, contacte o departamento de TI.