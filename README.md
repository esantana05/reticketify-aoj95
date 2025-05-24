# reticketify-aoj95
Projeto para aula de front-end

## ✅ Tecnologias e bibliotecas utilizadas

| Tecnologia  | Finalidade                                |
|-------------|--------------------------------------------|
| **Express** | Framework web para rotas e middlewares     |
| **Socket.IO** | Comunicação em tempo real (WebSocket)     |
| **Knex.js** | Query builder SQL + controle de migrations |
| **SQLite3** | Banco de dados local e leve                |
| **Zod**     | Validação de dados de entrada              |
| **@faker-js/faker** | Geração de dados fictícios para seeds |

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório e instale as dependências
```bash
git clone https://github.com/esantana05/reticketify-aoj95.git
cd reticketify-aoj95
npm install
npx knex migrate:latest --env development
npx knex seed:run --env development
npm start
