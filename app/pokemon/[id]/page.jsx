import { fetchdata } from "@/app/hooks/fetchdata";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { Suspense } from "react";

const Page = async ({ params }) => {
   const { id } = await params;
   const pokemon = await fetchdata(`https://pokeapi.co/api/v2/pokemon/${id}/`);
   const pokeimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

   /* console.log(pokemon)
   console.log(pokemon.types[0].name) */
   return (
      <div className="pokecard p-6 bg-slate-100 min-h-[100vh]">
         <div className="breadcru">
            <Link href={"/"} className="m-3 "><strong className="capitalize"> Home <FaAngleRight className="inline-block mb-1" />
            </strong></Link> <strong className="capitalize  tracking-wide">{pokemon.name}</strong>
         </div>
         <div className="pokedetial  flex flex-wrap items-center justify-center ">
            <div className="card bg-emerald-300 mx-auto max-w-96">
               <figure className="w-full flex flex-wrap items-center justify-center min-h-52 mb-9">
                  <Suspense fallback={'loading...'}>
                     <Image src={pokeimg} alt={pokemon.name} title={pokemon.name} width={200} height={200} />
                  </Suspense>
               </figure>
               <div className="pokeinfo p-5 bg-orange-300">
                  <ul className="space-y-2">
                     <li className="capitalize"><label><strong>Name: </strong>
                        <span className=" tracking-wide">{pokemon.name}</span></label></li>
                     <li><label><strong>Type: </strong></label>
                        {pokemon?.types?.map((item, i) =>
                           <span key={i}>
                              {i === 0 ? "" : <span>, </span>}
                              {item?.type?.name}
                           </span>
                        )}
                     </li>
                     <li><label><strong>Stats: </strong></label>
                        {pokemon?.stats?.map((item, i) =>
                           <span key={i}>
                              {i === 0 ? "" : <span>, </span>}
                              {item?.stat?.name}
                           </span>
                        )}
                     </li>
                     <li><label><strong>Abilities: </strong></label>
                        {pokemon?.abilities?.map((item, i) =>
                           <span key={i}>
                              {i === 0 ? "" : <span>, </span>}
                              {item?.ability?.name}
                           </span>
                        )}
                     </li>
                     <li><label><strong>Some Moves: </strong></label>
                        {pokemon?.moves?.slice(0, 5)?.map((item, i) =>
                           <span key={i}>
                              {i === 0 ? "" : <span>, </span>}
                              {item?.move?.name}
                           </span>
                        )}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Page