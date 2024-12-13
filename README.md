# D&D Spell Catalog

Um catálogo interativo de magias de Dungeons & Dragons com sistema de autenticação e filtros avançados.

## 🎯 Funcionalidades

- **Catálogo de Magias**

  - Visualização em cards com imagens
  - Descrições detalhadas
  - Indicadores para magias de ritual e concentração
  - Suporte para magias homebrew

- **Sistema de Filtros**

  - Busca por nome ou descrição
  - Filtro por classe (Mago, Clérigo, etc.)
  - Nível de magia (0-9)
  - Escola de magia
  - Tempo de conjuração
  - Filtros para magias homebrew, ritual e concentração
  - Fonte da magia (PHB, Xanathar's Guide, etc.)

- **Autenticação de Usuários**
  - Login com Google ou Apple
  - Perfil de usuário
  - Adição de novas magias (apenas usuários autenticados)

## 🚀 Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Headless UI

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/findspell.git
cd findspell
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse o projeto:
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente

## 🎨 Estrutura do Projeto

```
src/
  ├── components/     # Componentes React
  ├── contexts/       # Contextos da aplicação
  ├── types/         # Tipos TypeScript
  ├── utils/         # Funções utilitárias
  ├── config/        # Configurações
  └── data/          # Dados mockados
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
