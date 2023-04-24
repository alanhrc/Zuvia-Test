<p align="center">
  <a href="https://www.zuvia.com.br" target="blank"><img src="https://www.zuvia.com.br/assets/img/logo.png" width="300" alt="Zuvia Logo" /></a>
</p>

</br>

<p align="center">
    <a href="https://www.linkedin.com/in/alanhrc/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
    <a href="https://www.facebook.com/alan.camargo.3914" target="_blank"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white"></a>
    <a href="https://contate.me/alanhrc" target="_blank"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"></a>
</p>

</br>

## Description Test

### Technologies used
- Nodejs
- Express
- Prisma
- Mongodb
- SQlite
- Jest
- Swagger

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Obs
During app startup, a request is made to the api 'https://pokeapi.co/' and the local database is populated with 100 pokemons and 1 user test.

Pokemons quantity can be change in '.env' 'API_POKE_LIMIT'
```

```bash
# Development using Docker Compose and MongoDB

$ cp .env.example .env

$ docker compose up --build
```

```bash
# Development using SQlite

$ cp .env.template .env

$ change variable 'provider' in 'prisma/schema.prisma' to 'sqlite'

$ use one of 'id' to 'sqlite' in 'models'

$ npm run dev

# Example change id ⬇
```

<p align="center">
  <a href="#" target="blank"><img src="assets/model.png"  alt="Model Prisma" /></a>
</p>

## Test

```bash
# Unit tests

$ npm run test
```

<p align="center">
  <img src="assets/tests.png" />
</p>

<p align="center">
  <img src="assets/tests2.png" />
</p>

</br>

## Prisma Studio

```bash
# Prisma studio interface

$ npx prisma studio

# Open port http://localhost:5555 to view database
```

<p align="center">
  <img src="assets/prisma_studio.png" />
</p>

<p align="center">
  <img src="assets/prisma_studio2.png" />
</p>

</br>

## Docs Swagger

```bash
# Swagger docs

$ url http://localhost:3333/docs to view documentation
```

<p align="center">
  <img src="assets/docs.png" />
</p>

</br>

### Contains a file `Insomnia` with routes and params project to test manually, you can import file

</br>

<p align="center">
  <img src="assets/insomnia.png" />
</p>

## Require Features

### User

<p align="center">
  <img src="assets/user_tests.png" />
</p>

<p align="center">
  <img src="assets/create_user.png" />
</p>

<p align="center">
  <img src="assets/authenticate_user.png" />
</p>

<p align="center">
  <img src="assets/update_user.png" />
</p>

### Pokemon (necessary authentication)

<p align="center">
  <img src="assets/pokemon_tests.png" />
</p>

<p align="center">
  <img src="assets/create_pokemon.png" />
</p>

<p align="center">
  <img src="assets/update_pokemon.png" />
</p>

<p align="center">
  <img src="assets/find_pokemon.png" />
</p>

<p align="center">
  <img src="assets/find_one_pokemon.png" />
</p>

<p align="center">
  <img src="assets/delete_pokemon.png" />
</p>
