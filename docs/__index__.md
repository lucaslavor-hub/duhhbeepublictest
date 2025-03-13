# Arquitetura de pastas

```
--__mocks__          # lottie files config
--assets
--docs
--scripts
--android
--ios
--src
  |
  +-- api             # chamadas de funções de requisições, queries e mutations
  |
  +-- app             # rotas dos app
  |
  +-- components      # componentes compartilhados usados em toda a aplicação
  |
  +-- config           # todas as configurações globais, variáveis de ambiente, etc.
  |
  +-- hooks           # hooks compartilhados usados em toda a aplicação
  |
  +-- lib             # configurações de bibliotecas externas
  |
  +-- modules         # pastas baseadas em módulos
  |   +-- documentação dedicada!
  |
  +-- providers       # global providers e *auth context
  |
  +-- store           # global state management stores
  |
  +-- styles          # estilos e variantes do tema da aplicação
  |
  +-- types           # tipos base usados em toda a aplicação
  |
  +-- utils           # funções utilitárias compartilhadas
  |   +-- functions   # funções comuns compartilhadas
  |   +-- mocks       # valores estáticos/mock compartilhados
  |   +-- schemas     # schemas compartilhados
- jest.config.ts
- declarations.d.ts
- babel.config.js
- eslintrc.js
- prettierrc.json
- eas.json
- metro.config.ts
- package.json
- tamagui.config.ts
- tsconfig.ts
```
