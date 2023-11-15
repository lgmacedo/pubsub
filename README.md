# PubSub

Essa é uma simples biblioteca de Publish/Subscribe, capaz de realizar roteamento básico de mensagens com base nos nomes das queues, assim como, capaz de registrar todas as mensagens publicadas em ordem por queue em um sistema de arquivos.

Ao iniciar o servidor pela primeira vez, uma pasta 'storage' será criada automaticamente na raiz do projeto, e, nela, arquivos de texto farão a persistência das mensagens.

Rotas:
- POST/messages

    Envia uma mensagem (message) para determinada fila (queue). Os dois parâmetros do body abaixo são obrigatórios ao fazer a requisição.

        body:
        {
            "queue": String
            "message": String
        }

- GET/messages/:queue

    Traz todas as mensagens de uma determinada fila. 'queue' é o nome da fila procurada, passado como Query parameter.

## Como rodar

Primeiro, é necessário instalar todas as dependências necessárias para essa aplicação através do Node Package Manager:

```bash
$ npm install
```

Esse comando deve ser feito na raiz do projeto.

Também é recomendado criar um arquivo .env na raiz do projeto e declarar nele a variável de ambiente 'PORT', que será a porta usada pela aplicação. Se não declarada, a aplicação usará por padrão a porta 3000.

Para rodar a aplicação:

```bash
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Como rodar os testes automatizados

Após instalar todas as dependências:

```bash
npm run test:e2e
```
  
## Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
