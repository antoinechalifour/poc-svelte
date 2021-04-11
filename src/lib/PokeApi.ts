import type { RequestInfo, RequestInit, Response } from 'node-fetch';
import type { Pokemon } from '$lib/Pokemon';

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>

const Request = (fetch: Fetch) => <T = unknown>(url: string) => fetch(url)
	.then(response => response.json() as Promise<T>);

interface PokemonResponse {
	id: number
	order: number
	name: string
	sprites: {
		front_default: string
	}
	species: {
		url: string
	}
	types: Array<{
		slot: number
		type: { url: string }
	}>
}

interface SpeciesResponse {
	names: Array<{
		language: { name: string },
		name: string
	}>
}

interface TypeResponse {
	names: Array<{
		language: { name: string },
		name: string
	}>
}

export const PokeApi = (fetch: Fetch) => {
	const request = Request(fetch);
	const pokemon = (id: string) => request<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);

	return ({
		pokemon: async (id: string): Promise<Pokemon> => {
			const pokemonResponse = await pokemon(id);
			const species = await request<SpeciesResponse>(pokemonResponse.species.url);
			const types = await Promise.all(
				pokemonResponse.types.map(type => request<TypeResponse>(type.type.url))
			);

			return {
				id: pokemonResponse.id.toString(),
				name: species.names.find(x => x.language.name === 'en')!.name,
				picture: `/img/${pokemonResponse.id.toString().padStart(3, "0")}.png`,
				types: types.map(type => ({
					name: type.names.find(x => x.language.name === 'en')!.name,
					color: 'red'
				}))
			};
		}
	});
};