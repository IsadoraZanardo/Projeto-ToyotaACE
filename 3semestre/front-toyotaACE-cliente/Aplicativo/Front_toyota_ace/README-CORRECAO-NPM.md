# Correção do npm install

O erro `ERESOLVE` acontecia porque o projeto estava com `vite@^8.0.10`, mas `@vitejs/plugin-react-swc@3.11.0` aceita apenas Vite `^4 || ^5 || ^6 || ^7`.

Corrigido neste pacote:

```json
"vite": "^7.3.2"
```

Também removi arquivos `package-lock.json` antigos para o npm gerar um lock novo compatível.

## Como rodar

Dentro da pasta `Aplicativo/Front_toyota_ace`, rode:

```bash
npm install
npm run dev
```

Se ainda aparecer conflito por cache antigo, rode:

```bash
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
```
