## Estrutura da pasta @/modules

```
-- modules
   |
   +-- Auth
   |   +-- components
   |   +-- pages
   |         +-- Login
   |         +-- Register
   |               +-- Terms
   |               +-- Sign up
   |               +-- Face Scanning
   |               +-- SmartBee Form
   |               +-- Success 
   |         +-- Forgot Password
   |         +-- Reset Password
   |         +-- Welcome  
   |
   +-- Onboarding
   |     +-- components
   |     +-- pages
   |           +-- Onboarding
   |
   +-- Home
   |     +-- components
   |     +-- pages
   |           +-- Home
   |                 +-- Recommendations
   |                 +-- SmartBee Form
   |
   +-- Product
   |     +-- components
   |     +-- pages
   |           +-- Product
   |                 +-- Banner
   |                 +-- Content
   |                 +-- Actions (External link, like)
   +-- Profile
   |     +-- components
   |     +-- pages
   |           +-- Change Password
   |           +-- Edit Profile
   |                 +-- Name, birthday and country
   |           +-- Favorites
   |           +-- Settings
   |                 +-- Profile picture
   |                 +-- Delete account
   +-- Videos
   |     +-- components
   |     +-- pages
   |           +-- Videos
   |
   +- index.ts
```

## Observações gerais e regras:

1. Nome dos módulos devem ser em lowerCase e camelCase;
2. Caso componente/util/hook for utilizado em mais de um página, subir ele para a hierarquia do módulo;
3. Caso component/util/hook for utilizado em mais de um módulo, subir ele para hierarquia global;
4. Não existe camada de api por módulo nessa estrutura.
