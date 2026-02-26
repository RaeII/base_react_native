## Componentes compartilhados (`src/shared/components`)

Esta lista documenta **apenas componentes reutilizáveis** (compartilhados) que ficam em `src/shared/components/`.

- Se um componente é **exclusivo de uma página/tela**, ele deve ficar em `src/viewModels/<Tela>/...` (MVVM) e **não** deve entrar aqui.

### UI base (`src/shared/components/ui`)

#### `Button`

- **Caminho**: `src/shared/components/ui/Button.tsx`
- **Para que serve**: Botão padrão do app, com visual consistente via Tailwind + variantes (estilo e tamanho).
- **Quando usar**: Qualquer CTA (ações principais/secundárias), mantendo consistência entre Android/iOS/Web.
- **API/props principais**:
  - **`label`**: texto do botão (obrigatório)
  - **`variant`**: `default | secondary | destructive | ghost | link | outline`
  - **`size`**: `default | sm | lg`
  - **`labelClasses`**: classes extras apenas para o texto
  - Aceita props do `TouchableOpacity` (ex.: `onPress`, `disabled`, etc.)
- **Estrutura**:
  - Usa `class-variance-authority (cva)` para mapear variantes (`buttonVariants`, `buttonTextVariants`)
  - Usa `cn()` para composição de classes

#### `Input`

- **Caminho**: `src/shared/components/ui/Input.tsx`
- **Para que serve**: Campo de texto com label opcional e suporte a **senha** com toggle de visibilidade, pronto para Android/iOS/Web.
- **Quando usar**: Formulários (login, cadastro, filtros) quando você quer UI consistente e acessível.
- **API/props principais**:
  - **`label?`**: texto acima do input
  - **`labelClasses?`**: classes extras no label
  - **`inputClasses?`**: classes extras no `TextInput`
  - **`secureTextEntry`**: quando definido, habilita o ícone (olho) e alternância de visibilidade
  - Encaminha `ref` (`forwardRef`) e aceita props do `TextInput`
- **Estrutura**:
  - Usa `useTheme()` para ajustar `placeholderTextColor` (dark/light)
  - Ícone via `Ionicons` (Expo)

#### `Switch`

- **Caminho**: `src/shared/components/ui/Switch.tsx`
- **Para que serve**: Wrapper do `react-native` `Switch` com cores padronizadas pelo tema atual.
- **Quando usar**: Toggles simples (ex.: configurações) mantendo cores coerentes no dark/light.
- **API/props principais**:
  - Aceita todas as props do `Switch` nativo
  - Se `trackColor`, `thumbColor` ou `ios_backgroundColor` forem passados, eles têm prioridade
- **Estrutura**:
  - Lê `useColorScheme()` e aplica tokens de `src/shared/styles/theme`

### Overlays / Menus (`src/shared/components/AnchoredModal`)

#### `AnchoredModal`

- **Caminho**: `src/shared/components/AnchoredModal/AnchoredModal.tsx`
- **Export**: `src/shared/components/AnchoredModal/index.ts`
- **Para que serve**: Modal “ancorado” (tipo popover/menu) posicionado **relativo a um elemento** (anchor) usando `measureInWindow`.
- **Quando usar**: Menus de overflow, dropdowns, popovers de ações, toolboxes; especialmente útil no Web.
- **API/props principais**:
  - **`isOpen`**: controla visibilidade
  - **`onClose`**: fecha ao clicar fora / `onRequestClose`
  - **`anchorRef`**: ref do elemento âncora (precisa suportar `measureInWindow`)
  - **`placement?`**: `bottom-end | bottom-start` (default `bottom-end`)
  - **`offset?`**: distância entre âncora e modal (default `8`)
  - **`containerClassName?`**: classes extras para o container do popover
- **Estrutura**:
  - Usa `react-native-safe-area-context` para respeitar safe areas
  - Tem fallback de posição (principalmente para Web) e mantém a última posição para evitar “pulo” no fade-out

### Tema (`src/shared/components/ThemeToggle`)

#### `ThemeToggle`

- **Caminho**: `src/shared/components/ThemeToggle/ThemeToggle.tsx`
- **Export**: `src/shared/components/ThemeToggle/index.ts`
- **Para que serve**: Toggle de tema (claro/escuro) com UI premium e microinteração (indicador animado).
- **Quando usar**: Headers/menus/configurações onde o usuário alterna o tema do app.
- **API/props principais**:
  - **`isDark`**: estado atual do tema
  - **`onToggle`**: callback ao alternar
  - **`size?`**: `sm | md` (default `sm`)
  - **`className?`**: classes extras no container
- **Estrutura**:
  - Animação com `react-native-reanimated` (`useSharedValue`, `withTiming`)
  - Importante: o visual (Tailwind) fica em um `View` filho dentro do `Animated.View` (por limitação do NativeWind)

### Navegação (Mobile) (`src/shared/components/BottomTabBar`)

#### `BottomTabBar`

- **Caminho**: `src/shared/components/BottomTabBar/BottomTabBar.tsx`
- **Export**: `src/shared/components/BottomTabBar/index.ts`
- **Para que serve**: Barra de navegação inferior para **dispositivos móveis** (Android/iOS), com visual minimalista premium, ícones e labels.
- **Quando usar**: Layouts mobile que precisam de navegação principal por tabs, mantendo consistência visual com o design system.
- **API/props principais**:
  - **`tabs?`**: lista de tabs (`BottomTabBarItem[]`), com `key`, `label`, `route`, `icon`, `disabled?`, `matchMode?`
  - **`className?`**: classes extras para o container externo
  - **`DEFAULT_BOTTOM_TAB_ITEMS`**: configuração base com apenas rotas existentes no projeto atual (inicia em `Home`)
- **Estrutura**:
  - Navegação via `expo-router` (`router.push`) com proteção contra múltiplos toques durante transição
  - Estado ativo sincronizado com `usePathname`
  - Ajuste automático de safe area inferior (`useSafeAreaInsets`)
  - No Web retorna `null`, pois a navegação principal do projeto no Web é feita pela `Sidebar`

### Header autenticado (`src/shared/components/AuthenticatedHeader`)

#### `AuthenticatedHeader`

- **Caminho**: `src/shared/components/AuthenticatedHeader/AuthenticatedHeader.tsx`
- **Export**: `src/shared/components/AuthenticatedHeader/index.ts`
- **Para que serve**: Header global para rotas autenticadas (principalmente no mobile/tablet sem sidebar), com toggle de tema e menu de logout.
- **Quando usar**: No layout autenticado para manter ações globais consistentes entre telas sem duplicar header em cada view.
- **API/props principais**:
  - Não recebe props (consome `useAuth` e `useTheme` internamente)
- **Estrutura**:
  - Usa `AnchoredModal` para confirmação de logout ancorada no botão
  - Respeita safe area superior com `useSafeAreaInsets`
  - Mantém visual premium minimalista com borda sutil e ações compactas

### Navegação (Web) (`src/shared/components/Sidebar`)

#### `Sidebar`

- **Caminho**: `src/shared/components/Sidebar/Sidebar.tsx`
- **Export**: `src/shared/components/Sidebar/index.ts`
- **Para que serve**: Sidebar **minimalista e premium** (somente Web), com modo **recolhido/expandido**, itens com ícone + descrição, e área dedicada para **menus admin**.
- **Quando usar**: Layouts e páginas no Web que precisam de navegação lateral persistente (ex.: painel).
- **Destaques de UX/UI**:
  - Recolher/expandir com animação suave (reanimated)
  - Item ativo com destaque sutil
  - Menus admin com leve ênfase visual (badge/estilo)
  - Botão inferior de **Configurações** com dropdown ancorado (via `AnchoredModal`) e ação de logout
- **Observação**:
  - O componente retorna `null` fora do Web (Android/iOS).

