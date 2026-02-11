import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePokemonsList } from "@/hooks/usePokemonsList";
import { PokemonsList } from "./PokemonsList";

// all functions exported there are mocked here
vi.mock("../../hooks/usePokemonsList");

const pokemonsListMock = [
	{
		id: 25,
		name: "pikachu",
		types: ["eletric"],
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
	},
	{
		id: 4,
		name: "charmander",
		types: ["fire"],
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
	},
];

describe("PokemonsList", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should show loading state at first", () => {
		vi.mocked(usePokemonsList).mockImplementation(() => {
			return {
				pokemons: [],
				loading: true,
				error: null,
			};
		});

		render(<PokemonsList />);

		const loadingMessageElement = screen.getByText(/aguarde.../i);

		expect(loadingMessageElement).toBeInTheDocument();
	});

	it("should show an error message when any errors occurs", () => {
		const errorMessage = "Sou uma mensagem de erro";

		vi.mocked(usePokemonsList).mockImplementation(() => {
			return {
				pokemons: [],
				loading: false,
				error: errorMessage,
			};
		});

		render(<PokemonsList />);

		const errorMessageElement = screen.getByText(errorMessage);

		expect(errorMessageElement).toBeInTheDocument();
	});

	it("should show a list of preloaded pokemons", async () => {
		vi.mocked(usePokemonsList).mockImplementation(() => {
			return {
				pokemons: pokemonsListMock,
				loading: false,
				error: null,
			};
		});

		const firstPokemon = pokemonsListMock[0];
		const secondPokemon = pokemonsListMock[1];

		render(<PokemonsList />);

		const firstPokemonElement = await screen.findByText(firstPokemon.name);
		const secondPokemonElement = await screen.findByText(secondPokemon.name);

		expect(firstPokemonElement).toBeInTheDocument();
		expect(secondPokemonElement).toBeInTheDocument();
	});

	it.todo(
		"should open pokemon specific details when selected by the list",
		async () => {
			vi.mocked(usePokemonsList).mockImplementation(() => {
				return {
					pokemons: pokemonsListMock,
					loading: false,
					error: null,
				};
			});

			const user = userEvent.setup(); // setup simulated user

			render(<PokemonsList />);

			const firstPokemon = await screen.findByText(pokemonsListMock[0].name);

			await user.click(firstPokemon);

			// get the URL and verifies if it's on details first Pokemon's specific page
		},
	);
});
