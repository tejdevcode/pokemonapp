
'use client'
import Pokefilter from "@/app/ui/home/Pokefilter"
import { pokelist } from '@/app/lib/actions'
import Card from "./Card"
import { useEffect, useState } from "react"
import { poketype } from "@/app/lib/actions"
import { pokefilteractionurl } from "@/app/lib/actions"
import { CardSkeleton } from "@/app/skeleton/cardskeleton"
import { Suspense } from "react"
import { useSearchParams } from 'next/navigation'

const Cardsfilter = () => {
   const searchParams = useSearchParams()
   const querytypenum = searchParams.get('type');
   const queryname = searchParams.get('query');

   const [pokemon, setPokemon] = useState();
   /* console.log(pokemon) */
   const handleTypechange = async (typenum) => {
      /* console.log(typenum) */
      let poketypedata = { "results": [] };
      try {
         const pokemondata = await poketype(typenum);
         pokemondata.map(item =>
            poketypedata.results.push(item.pokemon)
         );
         setPokemon(poketypedata)
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   }
   const handleTypesearch = async (typesrch) => {
      let poketypedata = { "results": typesrch };
      setPokemon(poketypedata);
   }
   useEffect(() => {
      (async () => {
         try {
            if (querytypenum > 0) {
               if (querytypenum !== 0 && queryname && queryname !== "") {
                  const pokemondata = await pokefilteractionurl(querytypenum, queryname);
                  let poketypedata = { "results": pokemondata };

                  setPokemon(poketypedata)
               } else {
                  let poketypedata = { "results": [] };
                  const pokemondata = await poketype(querytypenum);
                  pokemondata.map(item =>
                     poketypedata.results.push(item.pokemon)
                  );
                  setPokemon(poketypedata)
               }
            } else {
               const pokemondata = await pokelist();
               setPokemon(pokemondata)
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      })();
   }, [])
   return (
      <>
         {/* selection of type and search component */}
         <Pokefilter onTypechange={handleTypechange} onTypesearch={handleTypesearch} />
         <div className="pokecard grid gap-5 auto-fill-[252px]">
            {/* cards component */}
            {pokemon?.results?.map((item, i) =>
               <Card key={i} data={item} />
            )}
         </div>
      </>
   )
}

export default Cardsfilter