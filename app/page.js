
import Cardsfilter from "./ui/home/Cardsfilter";

export default async function Home() {
  /* const { data } = useFetch(url, options); */
  /* console.log(pokemon.results[0].name) */

  return (
    <div className="bg-slate-100 py-14 min-h-screen">
      <div className="container">
        {/* main component */}
        <Cardsfilter />
      </div>
    </div>
  );
}
