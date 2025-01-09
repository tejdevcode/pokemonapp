'use client'
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fetchdata } from "@/app/hooks/fetchdata";
import { useRouter, useSearchParams } from 'next/navigation';

import { pokefilteraction } from "@/app/lib/actions"

const Pokefilter = ({ onTypechange, onTypesearch }) => {
   const [pokemon, setPokemon] = useState(null);
   /* const [selectedValue, setSelectedValue] = useState(); */
   const [query, setQuery] = useState('');
   const [progress, setProgress] = useState(0);
   const [loading, setLoading] = useState(false);

   const [selectedType, setSelectedType] = useState();
   const [pokemonName, setPokemonName] = useState('');
   const [pokemonData, setPokemonData] = useState(null);
   const [error, setError] = useState(null);
   const router = useRouter();

   const searchParams = useSearchParams()
   const querytypenum = searchParams.get('type');
   const queryname = searchParams.get('query');
   /* console.log(selectedType, query); */
   useEffect(() => {
      (async () => {
         try {
            const data = await fetchdata('https://pokeapi.co/api/v2/type/');
            setPokemon(data);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      })();
      querytypenum > 0 ? setSelectedType(querytypenum) : null;
      queryname ? setQuery(queryname) : null;
   }, []);

   const handleTypeChange = async (e) => {
      if (e.target.value > 0) {
         router.push(`/?type=${e.target.value}`)
         setSelectedType(e.target.value);
         onTypechange(e.target.value);
         setQuery('')
      };
      setPokemonName(''); // Clear previous search

      let progressInterval = 0;
      const interval = setInterval(() => {
         if (progressInterval < 90) {
            progressInterval += 1;
            setProgress(progressInterval);
         }
      }, 100);
      setLoading(true);
   };

   useEffect(() => { setLoading(false); }, [querytypenum]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setPokemonData(null);

      let progressInterval = 0;
      const interval = setInterval(() => {
         if (progressInterval < 90) {
            progressInterval += 1;
            setProgress(progressInterval);
         }
      }, 100);
      setLoading(true);

      const formData = new FormData();
      formData.set('type', selectedType);
      formData.set('query', query);

      let queryParams = new URLSearchParams();

      if (selectedType) queryParams.append('type', selectedType);
      if (query) queryParams.append('query', query);

      // Use router.push to update the URL with query parameters
      if (!selectedType && !query) queryParams = new URLSearchParams();
      router.push(`/?${queryParams.toString()}`);

      try {
         const pokmondata = await pokefilteraction(formData);
         onTypesearch(pokmondata)
      } catch (err) {
         setError('Error fetching Pokémon');
      } finally {
         setProgress(100);
         clearInterval(interval);
         setLoading(false);
      }
   };

   return (
      <form className="mb-14" onSubmit={handleSubmit}>
         <div className="selectbox mb-2 relative w-full md:w-96 ">
            <select name="type" id="type" className="w-full   border border-gray-200 py-2 px-3 rounded-lg
                  appearance-none forced-colors:appearance-auto bg-slate-50 row-start-1 col-start-1 hover:border-cyan-500  hover:bg-whit text-slate-500 cursor-pointer max-h-80 capitalize"
               onChange={handleTypeChange} value={selectedType}>
               <option value={"0"}>Select</option>
               {pokemon?.results?.map((item, i) =>
                  <option value={i + 1} key={i + 1} className="capitalize text-sm">{item?.name}</option>
               )}
            </select>
            <svg className="pointer-events-none z-10 right-2 top-[14px] absolute h-4 w-4 self-center justify-self-end forced-colors:hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
               <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
            </svg>
         </div>
         <div className="searchbox  w-full md:w-1/2 relative rounded-lg overflow-hidden border border-gray-200">
            <input type="text" name="query" id="query" placeholder="Search..." className="w-full py-3 pl-10 rounded-lg" value={query}
               onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
            <IoSearchSharp className="absolute left-3 top-[14px] text-gray-400 text-xl" />

            {loading && <div style={{ width: '100%', background: '#ddd', height: '6px' }} className="bg-green-400  relative">
               <div style={{ width: `${progress}%`, height: '100%' }} className="h-[18px] text-center text-[8px] bg-green-400 "></div>
            </div>}
            {/* <div className="pokename">
               <label htmlFor=""></label>
            </div> */}
            <button type="submit"
               className="absolute top-0 right-0 bg-cyan-900 text-white px-4 py-3 hover:bg-black transition-all">Search</button>
         </div>
      </form >
   )
}

export default Pokefilter