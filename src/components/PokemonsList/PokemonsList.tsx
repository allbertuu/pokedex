import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { usePokemonsList } from "@/hooks/usePokemonsList";
import noPokemonImage from "../../images/no-pokemon.jpg";

const POKEMON_TYPE_COLORS: Record<string, string> = {
	fire: "#F08030",
	water: "#6890F0",
	grass: "#78C850",
	electric: "#F8D030",
	ice: "#98D8D8",
	fighting: "#C03028",
	poison: "#A040A0",
	ground: "#E0C068",
	flying: "#A890F0",
	psychic: "#F85888",
	bug: "#A8B820",
	rock: "#B8A038",
	ghost: "#705898",
	dragon: "#7038F8",
	dark: "#705848",
	steel: "#B8B8D0",
	fairy: "#EE99AC",
	normal: "#A8A878",
};

export const PokemonsList = () => {
	const { pokemons, error, loading } = usePokemonsList();

	if (loading) {
		return (
			<div className="w-full py-20 text-center">
				<Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
				<p className="text-white/60 text-lg">Procurando Pokémons! Aguarde...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full py-20 text-center">
				<p className="text-white/60 text-lg">
					Houve um erro ao buscar os Pokémons.
					<br /> Mensagem de erro: <strong>{error}</strong>
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{pokemons.length > 0 ? (
				pokemons.map((pokemon, idx) => (
					<motion.div
						key={pokemon.id}
						whileHover={{
							y: -10,
						}}
						initial={{
							opacity: 0,
							scale: 0.9,
						}}
						animate={{
							opacity: 1,
							scale: 1,
						}}
						transition={{
							delay: idx * 0.05,
						}}
						className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden cursor-pointer group"
						// onClick={() => handleSelectPokemon(p)}
					>
						<div className="relative h-48 flex items-center justify-center bg-zinc-800/50 p-6">
							<div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
							<img
								src={pokemon.image || noPokemonImage}
								alt={pokemon.name}
								className="h-full group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
							/>
							<span className="absolute top-2 right-4 text-white/20 font-black text-4xl">
								#{pokemon.id.toString().padStart(3, "0")}
							</span>
						</div>
						<div className="p-4">
							<h4 className="text-xl font-bold text-white capitalize mb-3">
								{pokemon.name}
							</h4>
							<div className="flex gap-2">
								{pokemon.types.map((type) => (
									<span
										key={type}
										style={{
											backgroundColor: POKEMON_TYPE_COLORS[type] || "#A8A878",
										}}
										className="uppercase font-bold px-3 py-1 rounded text-white text-sm"
									>
										{type}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				))
			) : (
				<div className="col-span-full py-20 flex flex-col items-center justify-center">
					<div className="text-white/60 text-lg">
						Nenhum Pokémon com esse termo foi encontrado.
					</div>
				</div>
			)}
		</div>
	);
};
