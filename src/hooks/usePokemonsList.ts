import { useEffect, useState } from "react";
import type { Pokemon } from "@/types/pokedex";
import { getAllPokemons } from "../services/pokedex";

export const usePokemonsList = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const data = await getAllPokemons();
				setPokemons(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				}
				setError(String(err));
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { pokemons, loading, error };
};
