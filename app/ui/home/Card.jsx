import Link from "next/link"
import Image from "next/image"
import { LuMoveRight } from "react-icons/lu";
import urlid from "@/app/lib/urlid"


const Card = ({ data }) => {
   /* const { name, url } = data; */
   const pokeid = urlid(data?.url);

   //const pokeimg = `https://img.pokemondb.net/artwork/${data?.name}.jpg`;
   const pokeimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeid}.png`;

   return (
      <div className="card bg-white rounded-md border border-gray-200 group">
         <figure className="flex justify-center items-center p-2 min-h-36">
            <Link href={`/pokemon/${pokeid}`} className="h-32 block">
               <Image src={pokeimg} width={128} height={128} className="scale-100 group-hover:scale-110 transition-all duration-300 w-auto max-h-full" title={data?.name} alt={data?.name} priority />
            </Link>
         </figure>
         <div className="cardinfo bg-gray-50 p-3 rounded-bl-md rounded-br-md">
            <h3 className="mb-5 capitalize tracking-wide">{data?.name}</h3>
            <Link href={`/pokemon/${pokeid}`}>Details <LuMoveRight className="inline-block" /></Link>
         </div>
      </div >
   )
}

export default Card