# Sistema de Autenticação

Este documento explica como funciona o sistema de autenticação do projeto. Se você é iniciante, leia com calma — tudo está explicado passo a passo.

---

## O que é autenticação?

Autenticação é o processo de **verificar a identidade de um usuário**. Quando alguém digita login e senha, o sistema confirma se essas credenciais são válidas. Se forem, o usuário ganha acesso às páginas protegidas do app.

---

## Como funciona neste projeto?

O sistema usa **JWT (JSON Web Token)** enviado pelo backend como um **cookie httpOnly**. Aqui está o fluxo simplificado:

```
1. Usuário digita login + senha na tela de Login
2. O app envia os dados para o backend (POST /auth/login)
3. Se as credenciais estiverem corretas, o backend:
   - Retorna os dados do usuário no corpo da resposta (JSON)
   - Seta um cookie chamado "token_access" com o JWT
4. O app salva os dados do usuário localmente (AsyncStorage)
5. Nas próximas requisições, o cookie é enviado automaticamente
6. O backend valida o cookie em cada requisição protegida
```

### O que é JWT?

JWT é um "token" — uma string criptografada que contém informações do usuário (id, username, email, etc). O backend gera esse token ao fazer login e usa ele para saber quem está fazendo cada requisição.

### O que é cookie httpOnly?

É um cookie que **só o navegador/sistema gerencia**. O código JavaScript do app **não consegue ler** esse cookie diretamente, o que é mais seguro — impede ataques como XSS (Cross-Site Scripting) de roubar o token.

---

## Estrutura de arquivos

Aqui estão todos os arquivos relacionados à autenticação e o que cada um faz:

### Tipagens

| Arquivo | O que faz |
|---------|-----------|
| `src/shared/types/auth.types.ts` | Define os **tipos TypeScript** usados na autenticação: `LoginCredentials` (login + senha) e `AuthContextType` (tudo que o contexto disponibiliza) |
| `src/shared/types/api.types/auth.api.types.ts` | Define o tipo `LoginResponse` — o formato da resposta que o backend retorna após o login |

### Serviço de armazenamento

| Arquivo | O que faz |
|---------|-----------|
| `src/shared/services/storage.service.ts` | Salva e recupera dados do usuário no **AsyncStorage** (armazenamento local do dispositivo). Não armazena o token JWT, apenas dados do usuário (nome, email, etc.) |

### API de autenticação

| Arquivo | O que faz |
|---------|-----------|
| `src/shared/api/auth/auth.api.ts` | Contém a função `login()` que faz a requisição POST para `/auth/login` no backend |

### Configuração do Axios

| Arquivo | O que faz |
|---------|-----------|
| `src/shared/api/index.api.ts` | Configura o axios (biblioteca de requisições HTTP). Dois pontos importantes: `withCredentials: true` (envia cookies automaticamente) e o **interceptor de resposta** que detecta erros 401/403 e força logout |

### Contexto de autenticação (o coração do sistema)

| Arquivo | O que faz |
|---------|-----------|
| `src/shared/contexts/AuthContext.tsx` | O **AuthProvider** gerencia todo o estado de autenticação. Fornece as funções `login()`, `logout()`, `forceLogout()` e os dados do `user` para todo o app |

### Rotas e telas

| Arquivo | O que faz |
|---------|-----------|
| `src/app/_layout.tsx` | Layout raiz — envolve o app inteiro com o `AuthProvider` |
| `src/app/index.tsx` | **Rota raiz** — decide se redireciona para Login ou para a área autenticada |
| `src/app/(auth)/_layout.tsx` | Layout das telas de autenticação (Login, etc.) |
| `src/app/(auth)/Login.tsx` | Rota da tela de Login — conecta `useLoginModel` com `LoginView` |
| `src/app/(authenticated)/_layout.tsx` | **Guard de rota** — bloqueia acesso se o usuário não estiver logado |
| `src/app/(authenticated)/index.tsx` | Página inicial após login — mostra dados do usuário e botão de logout |

### ViewModel do Login

| Arquivo | O que faz |
|---------|-----------|
| `src/viewModels/Login/login.model.tsx` | Lógica do login: validação do formulário com Zod, chamada da API, tratamento de erros e navegação |
| `src/viewModels/Login/login.view.tsx` | Interface visual do login: campos de input, mensagem de erro e botão com loading |

---

## Fluxo detalhado

### 1. Quando o app abre

```
_layout.tsx
└── AuthProvider é montado
    └── checkAuthState() é chamado
        ├── Verifica se há dados do usuário no AsyncStorage
        ├── Se SIM → define user no estado (usuário continua logado)
        └── Se NÃO → user permanece null

index.tsx (rota raiz)
├── Se loading → mostra ActivityIndicator (tela de carregamento)
├── Se user existe → Redirect para /(authenticated)
└── Se user é null → Redirect para /(auth)/Login
```

### 2. Quando o usuário faz login

```
LoginView (tela)
└── Usuário digita login + senha e clica em "Entrar"
    └── login.model.tsx → handleLogin()
        ├── Valida campos com Zod (não pode estar vazio)
        ├── Se inválido → mostra erros nos campos
        └── Se válido:
            └── AuthContext.login(credentials)
                ├── POST /auth/login (via auth.api.ts)
                ├── Backend valida credenciais
                ├── Backend seta cookie "token_access"
                ├── Backend retorna dados do usuário no body
                ├── StorageService.setUserData(user) → salva no AsyncStorage
                ├── setUser(user) → atualiza estado do React
                └── router.replace("/(authenticated)") → navega para área protegida
```

### 3. Quando uma requisição falha por sessão expirada

```
Qualquer request autenticada
└── Backend retorna 401 ou 403
    └── Interceptor do Axios (index.api.ts)
        └── onAuthenticationFailed callback
            └── AuthContext.forceLogout()
                ├── StorageService.clearAuthData() → limpa AsyncStorage
                ├── setUser(null) → remove usuário do estado
                └── router.replace("/(auth)/Login") → volta para login
```

### 4. Quando o usuário faz logout manualmente

```
Página autenticada → botão "Sair"
└── AuthContext.logout()
    ├── StorageService.clearAuthData() → limpa AsyncStorage
    ├── setUser(null)
    └── router.replace("/(auth)/Login")
```

---

## Como usar o `useAuth()` em qualquer tela

O hook `useAuth()` te dá acesso aos dados e funções de autenticação em **qualquer componente** dentro do `AuthProvider`:

```tsx
import { useAuth } from "@/shared/contexts/AuthContext";

export default function MinhaPagina() {
  const { user, logout, loading } = useAuth();

  // user → dados do usuário logado (ou null)
  // user.id, user.username, user.email, user.is_admin

  // logout() → desloga o usuário

  // loading → true enquanto verifica autenticação inicial
}
```

### Propriedades disponíveis:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `user` | `User \| null` | Dados do usuário logado. `null` se não estiver autenticado |
| `loading` | `boolean` | `true` enquanto verifica o estado de autenticação ao abrir o app |
| `loginLoading` | `boolean` | `true` durante a requisição de login |
| `login(credentials)` | `function` | Faz login com `{ login, password }` |
| `logout()` | `function` | Desloga o usuário |
| `forceLogout()` | `function` | Logout forçado (usado internamente pelo interceptor) |
| `setUser(user)` | `function` | Atualiza os dados do usuário no estado |

---

## Guard de rotas

As rotas dentro de `(authenticated)/` são **protegidas**. O arquivo `(authenticated)/_layout.tsx` verifica se o usuário está logado antes de renderizar qualquer página:

- **Logado** → renderiza a página normalmente
- **Não logado** → redireciona automaticamente para `/(auth)/Login`

Isso significa que **qualquer tela nova** que você criar dentro de `src/app/(authenticated)/` estará **automaticamente protegida** — não precisa fazer nenhuma verificação manual.

---

## Segurança

| Aspecto | Como é tratado |
|---------|----------------|
| **Token JWT** | Armazenado como cookie `httpOnly` — JavaScript não consegue acessar |
| **Envio do token** | `withCredentials: true` no Axios envia o cookie automaticamente |
| **Sessão expirada** | Interceptor do Axios detecta 401/403 e força logout |
| **Dados locais** | Apenas dados do usuário (nome, email) são salvos no AsyncStorage, nunca o token |
| **Validação** | Formulário validado com Zod antes de enviar para a API |

---

## Como adicionar uma nova rota protegida

1. Crie o arquivo em `src/app/(authenticated)/NomeDaPagina.tsx`
2. A rota já estará protegida automaticamente pelo guard
3. Use `useAuth()` para acessar dados do usuário

```tsx
// src/app/(authenticated)/Perfil.tsx
import { View, Text } from "react-native";
import { useAuth } from "@/shared/contexts/AuthContext";

export default function Perfil() {
  const { user } = useAuth();

  return (
    <View>
      <Text>Olá, {user?.username}</Text>
    </View>
  );
}
```

---

## Backend — Referência rápida

O backend (`base_node`) tem duas peças principais:

- **`POST /auth/login`** — Recebe `{ login, password }`, valida, gera o JWT e seta como cookie `token_access`
- **`jwt.middleware.ts`** — Middleware que lê o cookie `token_access`, valida o JWT e libera ou bloqueia a requisição

O cookie é configurado com:
- `httpOnly: true` — não acessível via JavaScript
- `secure: true` em produção — só enviado via HTTPS
- `sameSite: "lax"` em dev, `"none"` em produção
- `maxAge: 30 dias` — tempo de expiração
