import axios from 'axios'

export const apiPoke = axios.create({
  baseURL: `${process.env.API_POKE_URL}`,
});
