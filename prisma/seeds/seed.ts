import { PrismaClient } from '@prisma/client'
import { apiPoke } from '../../src/shared/api/api'
import { hash } from 'bcryptjs';
import 'dotenv/config'

const prisma = new PrismaClient()

interface IResponsePokeApi {
  results: Array<{
    name: string;
    url: string
  }>
}

interface IResponsePokemonDetails {
  id: number;
  name: string;
  weight: number;
  height: number;
}

async function main() {
  // Seeder to create pokemons on local database

  const pokemonsApi = await apiPoke.get<IResponsePokeApi>(`pokemon?limit=${process.env.API_POKE_LIMIT}&offset=0`)

  const pokemons = pokemonsApi.data.results

  for await (const pokemon of pokemons) {
    const pokemonsDetailsApi = await apiPoke.get<IResponsePokemonDetails>(pokemon.url)

    const pokemonsDetails = pokemonsDetailsApi.data

    await prisma.pokemons.upsert({
      where: {
        id_poke_api: pokemonsDetails.id
      },
      create: {
        id_poke_api: pokemonsDetails.id,
        name: pokemonsDetails.name,
        weight: pokemonsDetails.weight,
        height: pokemonsDetails.height
      },
      update: {
        name: pokemonsDetails.name,
        weight: pokemonsDetails.weight,
        height: pokemonsDetails.height
      }
    })
  }

  // Seeder to create an example user

  await prisma.users.upsert({
    where: {
      email: 'alancamargo50@gmail.com',
    },
    create: {
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: await hash('123456', 10)
    },
    update: {
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: await hash('123456', 10)
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
