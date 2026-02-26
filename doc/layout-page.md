# Padrão Oficial de Layout de Página (Premium Minimalista)

Este documento define o padrão visual, estrutural e técnico para páginas autenticadas do app (Android, iOS e Web), com base no layout da tela de `Usuario`.

Objetivo: manter consistência de UI/UX em todas as telas, com visual limpo, hierarquia clara, boa responsividade e implementação prática em React Native + NativeWind.

---

## 1) Estrutura base da página

Toda página de visualização de dados deve seguir esta composição:

1. Container raiz da tela
2. Wrapper central com largura controlada
3. Blocos (cards) com responsabilidades separadas
4. Ações críticas com confirmação (modal ancorado)

### 1.1 Container raiz

- Classe padrão:
  - `flex-1 bg-background p-4 web:p-6`
- Regras:
  - `flex-1`: ocupa toda altura útil.
  - `bg-background`: fundo semântico do tema.
  - `p-4` no mobile e `web:p-6` no web para respiro premium.

### 1.2 Wrapper central

- Classe padrão:
  - `w-full max-w-5xl self-center gap-4`
- Regras:
  - Centraliza conteúdo no web com largura máxima legível.
  - Mantém espaçamento vertical constante entre seções (`gap-4`).

### 1.3 Blocos (cards)

Cada seção da página deve estar em card independente:

- Classe base de card:
  - `rounded-3xl border border-border/70 p-5 web:p-6`
- Motivo:
  - `rounded-3xl`: assinatura visual premium.
  - `border-border/70`: separação sutil sem poluição.
  - Sem `bg-*` no card: o fundo deve ser herdado do container autenticado para manter o padrão global.
  - `p-5/web:p-6`: conforto visual e escaneabilidade.

---

## 2) Ordem de conteúdo recomendada (wireframe textual)

Para páginas de perfil/usuário:

1. **Card de contexto**
   - Título principal da tela.
   - Subtítulo curto explicando o objetivo da página.

2. **Card de dados**
   - Lista de informações em linhas/blocos reutilizáveis.
   - Cada item com label pequena + valor destacado.

3. **Card de configurações**
   - Ações de preferência (ex.: tema).
   - Ações sensíveis (ex.: logout) em área de destaque destrutivo.

4. **Confirmação de ação crítica**
   - `AnchoredModal` com botões de cancelar/confirmar.

---

## 3) Design system aplicado (tipografia, espaçamento e componentes)

## 3.1 Tipografia

Hierarquia oficial:

- Título de página:
  - `text-2xl font-bold text-foreground`
- Subtítulo/descrição:
  - `text-sm text-muted-foreground`
- Título de seção:
  - `text-base font-semibold text-foreground`
- Label de campo:
  - `text-xs font-semibold uppercase tracking-wide text-muted-foreground`
- Valor de campo:
  - `text-sm font-medium text-foreground`
- Texto auxiliar:
  - `text-xs text-muted-foreground`

### 3.2 Escala de espaçamentos

- Página: `p-4` (mobile), `p-6` (web)
- Entre cards: `gap-4`
- Dentro de card: `p-5` (mobile), `p-6` (web)
- Entre itens internos: `mt-4 gap-3`
- Entre label e valor: `mt-1` quando em coluna

### 3.3 Bordas e raio

- Card principal: `rounded-3xl border border-border/70`
- Blocos internos: `rounded-2xl border border-border/60`
- Botão pill: `rounded-full border border-border bg-card`

### 3.4 Componentes obrigatórios/recomendados

- `ThemeToggle`: alternância de tema.
- `Button`: ações padrão (cancelar/confirmar).
- `AnchoredModal`: confirmação contextual ancorada no gatilho.

Regra: preferir sempre os componentes compartilhados já existentes para consistência.

---

## 4) Cores e tokens oficiais

O projeto usa cores semânticas via Tailwind + CSS variables (`hsl(var(--token))`).

## 4.1 Tokens principais de superfície e texto

- `bg-background` / `text-foreground`: base da tela.
- `bg-card` / `text-card-foreground`: superfícies elevadas.
- `text-muted-foreground`: conteúdo secundário.
- `border-border`: divisórias e contornos.

## 4.2 Tokens de estado

- `destructive`: ações críticas (ex.: sair, excluir).
- `primary`: destaques e foco.
- `success`, `warning`, `info`: feedback contextual.

## 4.3 Valores reais do tema (resumo)

Tema claro:

- `--background: 0 0% 100%`
- `--foreground: 222 47% 11%`
- `--card: 0 0% 100%`
- `--border: 214 32% 91%`
- `--muted-foreground: 215 16% 47%`

Tema escuro:

- `--background: 222 47% 5%`
- `--foreground: 210 40% 98%`
- `--card: 222 47% 7%`
- `--border: 217 33% 17%`
- `--muted-foreground: 215 20% 65%`

Regra: nunca hardcodar cor para layout base; usar token semântico.

---

## 5) Padrão dos blocos de dados de usuário

Cada linha de dado deve seguir:

- Container:
  - `rounded-2xl border border-border/60 px-4 py-3`
  - No web, quando útil: `web:flex-row web:items-center web:justify-between`
- Label:
  - `text-xs font-semibold uppercase tracking-wide text-muted-foreground`
- Valor:
  - `mt-1 text-sm font-medium text-foreground web:mt-0`

Campos recomendados para perfil:

- Nome de usuário
- E-mail
- Status (ativo/inativo)
- Perfil (usuário/admin)
- Último acesso
- Data de criação

---

## 6) Padrão de configurações

## 6.1 Preferência (tema)

- Item de configuração:
  - `flex-row items-center justify-between rounded-2xl border border-border/60 px-4 py-3`
- Texto:
  - Título `text-sm font-semibold text-foreground`
  - Descrição `mt-1 text-xs text-muted-foreground`
- Controle:
  - `ThemeToggle` sempre no lado direito.

## 6.2 Ação crítica (logout)

- Bloco de atenção:
  - `rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3`
- Botão de gatilho:
  - `flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2`
- Confirmação obrigatória:
  - `AnchoredModal` com texto curto + `Button` cancelar/confirmar.

---

## 7) Responsividade (Android/iOS/Web)

### Mobile (Android/iOS)

- Layout em coluna.
- Cards em largura total.
- Espaçamento confortável para toque.
- Alvos de toque com altura adequada (`py-2`, `py-3`, botões pill).

### Web

- Conteúdo centralizado com `max-w-5xl`.
- Mais respiro (`web:p-6`).
- Uso de `web:flex-row` para pares label/valor em uma linha.
- Manter legibilidade e densidade equilibradas.

---

## 8) Acessibilidade e usabilidade

- Contraste via tokens semânticos (`foreground` x `background/card`).
- Não depender apenas de cor para estado crítico: usar texto e confirmação.
- Botões com texto claro e área clicável confortável.
- Feedback de interação:
  - `activeOpacity` em botões tocáveis.
- No web, manter navegação consistente com Sidebar e foco em clareza visual.

---

## 9) Estrutura técnica obrigatória (MVVM)

Para qualquer nova página neste padrão:

- `src/app/(authenticated)/<rota>.tsx`
  - Apenas conecta model + view.
- `src/viewModels/<pagina>/<pagina>.model.tsx`
  - Regras de negócio, estado e handlers.
- `src/viewModels/<pagina>/<pagina>.view.tsx`
  - Estrutura visual com classes NativeWind.
- Componentes específicos da página:
  - `src/viewModels/<pagina>/components/...` (somente se necessário).
- Componentes compartilhados:
  - `src/shared/components/...` (somente quando houver reuso real).

---

## 10) Checklist de implementação (copiar e seguir)

- [ ] Usou container raiz: `flex-1 bg-background p-4 web:p-6`
- [ ] Centralizou conteúdo com `w-full max-w-5xl self-center`
- [ ] Separou a tela em cards com `rounded-3xl border border-border/70` (sem `bg-*`)
- [ ] Aplicou tipografia hierárquica (`2xl`, `base`, `sm`, `xs`)
- [ ] Usou apenas tokens semânticos de cor (sem hardcode de layout)
- [ ] Configurações com padrão de item (`rounded-2xl border ...` sem `bg-*`)
- [ ] Ação crítica com bloco destrutivo e confirmação em modal
- [ ] Estrutura MVVM mantida
- [ ] Compatível com Android, iOS e Web

---

## 11) Regra de ouro

Qualquer nova página deve parecer parte da mesma família visual:

- Poucos elementos por seção
- Muito respiro
- Contraste sutil e profissional
- Hierarquia de informação clara
- Interações discretas, previsíveis e seguras
