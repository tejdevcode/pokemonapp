'use server';
import { fetchdata } from '@/app/hooks/fetchdata'

export async function pokelist() {
   return await fetchdata('https://pokeapi.co/api/v2/pokemon?limit=9');
}

export async function pokefilteraction(formData) {
   const { type, query } = Object.fromEntries(formData);

   const typeResponce = await fetchdata(`https://pokeapi.co/api/v2/type/${type}`);

   const filteredpokemon = typeResponce?.pokemon
      ?.map((p) => p.pokemon)
      ?.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
   /* console.log(type, query, 'srcaction') */
   return filteredpokemon.slice(0, 36);
}
export async function pokefilteractionurl(querytypenum, queryname) {
   const type = querytypenum;
   const query = queryname;

   console.log(type, query)
   const typeResponce = await fetchdata(`https://pokeapi.co/api/v2/type/${type}`);

   const filteredpokemon = typeResponce?.pokemon
      ?.map((p) => p?.pokemon)
      ?.filter((p) => p?.name?.toLowerCase()?.includes(query?.toLowerCase()));
   return filteredpokemon.slice(0, 36);
}

export async function poketype(type) {
   const typeResponce = await fetchdata(`https://pokeapi.co/api/v2/type/${type}`);

   return typeResponce.pokemon.slice(0, 36);
}