---
trigger: always_on
---

## Regras de desenvolvimento

- O projeoto o padrão de arquitetura MVVM (Model-View-ViewModel), separando interface do usuário (View) da lógica de negócios (Model), mantenha o sempre esse padrão.
- Cada pagina terá sua estrutura principal dentro de ./src/viewModel/, onde terá view e model, componentes que são sómente da pagina e os estilos da pagina.
- Utilize compoentes sempre que achar necessário (./src/shared/components), apenas crie componentes que podem ser reaproveitado mais de uma vez, para cada componente crie uma pasta.
- Sempre consulte a lista do componentes para visualizar se tem algum coponente que pode ser reutilizado em doc/components.md
- Sempre que for criado um novo componente atualize a lista de componentes em doc/components.md
- Estruture os componentes de forma reutilizável, mas apenas quando houver real necessidade de reutilização.
- Desenvolva usando React Native com suporte completo para Android, iOS e Web.
- IMPORTANTE Sempre desenvolva código para os 3 ambientes: Android, iOS e Web.
- Utilize sempre Tailwind CSS e o sistema de componentes nativecn-ui.
- Priorize desempenho e responsividade: evite re-renderizações desnecessárias, use memoização sempre que necessário e prefira layouts otimizados para multiplataforma.
- Crie apenas o código estritamente necessário para a funcionalidade solicitada. Não adicione abstrações ou arquivos que não tenham uso imediato.
- Todo código deve ser limpo, robusto e fácil de manter. Nomes de variáveis, funções e componentes devem ser descritivos e seguir convenções de nomenclatura consistentes (PascalCase para componentes, camelCase para variáveis e funções).
- Use TypeScript em todo o projeto com tipagem clara e rigorosa.
- Evite dependências externas, a menos que sejam essenciais e bem justificadas.
- Ao implementar qualquer funcionalidade, considere o impacto nos três ambientes (Android, iOS, Web).
- Componentes devem ser responsivos por padrão e adaptáveis a diferentes tamanhos de tela.
- Sempre crie Types para tipos globais para deixar o código organizado. Sempre faça em "./src/shared/types"
- Sempre que possível, documente o código complexo ou que envolva regras de negócio da aplicação
- A configuração do axios e as funções de requests estão em src/shared/api, sempre crie uma pasta para cada request
- Sempre sempare a tipagem que é usada apenas para request em src/shared/types/api.types e a tipagem global em src/shared/types