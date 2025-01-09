
'use client'
import Pokefilter from "@/app/ui/home/Pokefilter"
import { pokelist } from '@/app/lib/actions'
import Card from "./Card"
import { useEffect, useState } from "react"
import { poketype } from "@/app/lib/actions"
import { pokefilteractionurl } from "@/app/lib/actions"
import { useSearchParams } from 'next/navigation'
import Nodata from "./Nodata"

const Cardsfilter = () => {
   const searchParams = useSearchParams()
   const querytypenum = searchParams.get('type');
   const queryname = searchParams.get('query');

   const [pokemon, setPokemon] = useState();
   const [showNoData, setShowNoData] = useState(false);
   /* console.log(pokemon) */
   const handleTypechange = async (typenum) => {
      /* console.log(typenum) */
      let poketypedata = { "results": [] };
      try {
         if (typenum > 0) {
            const pokemondata = await poketype(typenum);
            pokemondata?.map(item =>
               poketypedata?.results?.push(item.pokemon)
            );
            /* console.log(poketypedata) */
            setPokemon(poketypedata)
         } else {
            const pokemondata = await pokelist();
            setPokemon(pokemondata)
         }
      } catch (error) {
         console.error('Error fetching data:', error);
         setPokemon(null)
      }
   }
   const handleTypesearch = async (typesrch) => {
      let poketypedata = { "results": typesrch };
      setPokemon(poketypedata);
   }
   useEffect(() => {
      (async () => {
         try {
            if (querytypenum > 0 && querytypenum < 20) {
               if (querytypenum !== 0 && queryname && queryname !== "") {
                  const pokemondata = await pokefilteractionurl(querytypenum, queryname);
                  let poketypedata = { "results": pokemondata };

                  setPokemon(poketypedata)
               } else {
                  let poketypedata = { "results": [] };
                  const pokemondata = await poketype(querytypenum);
                  pokemondata.map(item =>
                     poketypedata?.results?.push(item.pokemon)
                  );
                  setPokemon(poketypedata)
               }
            } else {
               const pokemondata = await pokelist();
               setPokemon(pokemondata)
            }
         } catch (error) {
            console.error('Error fetching data:', error);
            setPokemon(null);
         }
      })();
   }, [])

   useEffect(() => {
      const timer = setTimeout(() => {
         setShowNoData(true);
      }, 3000);

      return () => clearTimeout(timer);
   }, []);
   return (
      <>
         {/* selection of type and search component */}
         <Pokefilter onTypechange={handleTypechange} onTypesearch={handleTypesearch} />
         <div className="pokecard grid gap-5 auto-fill-[252px]">
            {/* cards component */}
            {pokemon ?
               pokemon?.results?.map((item, i) =>
                  <Card key={i} data={item} />
               ) :
               showNoData ? <Nodata /> : <p>Loading...</p>

            }
         </div>
      </>
   )
}

export default Cardsfilter