import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { PokemonsList } from "@/components/PokemonsList/PokemonsList";

export const Route = createFileRoute("/home")({
	component: HomePage,
});

function HomePage() {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
			}}
			className="p-6 max-w-7xl mx-auto min-h-screen"
		>
			<header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-red-600 rounded-full border-4 border-white flex items-center justify-center shadow-[0_0_15px_rgba(255,0,0,0.4)]">
						<div className="w-4 h-4 bg-white rounded-full animate-pulse" />
					</div>

					<h2 className="text-3xl font-bold text-white tracking-tighter">
						POKÉDEX
					</h2>
				</div>

				<div className="relative max-w-md w-full">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						placeholder="Buscar por nome ou ID..."
						// value={searchTerm}
						// onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-lg text-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 hover:border-red-500 transition-colors"
					/>
				</div>
			</header>

			<PokemonsList />
		</motion.div>
	);
}
