import { PokemonClient } from "pokenode-ts";
import type { Pokemon } from "@/types/pokedex";

// enables logs
// it comes with Cache (axios) by default
const api = new PokemonClient({ logs: true });

export async function getAllPokemons() {
	const resultsLimit = 10; // limit of pokemons gotten
	const { results = [] } = await api.listPokemons(undefined, resultsLimit);

	const pokemons: Pokemon[] = [];

	for (const { name } of results) {
		const pokemon = await getPokemonByName(name);

		pokemons.push({
			id: pokemon.id,
			name,
			types: pokemon.types.map(({ type }) => type.name),
			image: pokemon.sprites.front_default,
		});
	}

	return pokemons;
}

export async function getPokemonByName(name: string) {
	const result = await api.getPokemonByName(name);

	return result;
}
