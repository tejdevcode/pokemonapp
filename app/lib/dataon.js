export async function fetchpokedata(query) {

   try {
      const response = await fetch(query);
      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch Pokemons.');
   }
}