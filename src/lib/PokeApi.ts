import type { Pokemon } from '$lib/Pokemon';
import type { Fetch, ImgSerializer } from '$lib/types';
import { RequestArrayBuffer, RequestJson } from '$lib/types';

interface PokemonResponse {
	id: number;
	order: number;
	name: string;
	sprites: {
		front_default: string;
	};
	species: {
		url: string;
	};
	types: Array<{
		slot: number;
		type: { url: string };
	}>;
}

interface SpeciesResponse {
	names: Array<{
		language: { name: string };
		name: string;
	}>;
}

interface TypeResponse {
	names: Array<{
		language: { name: string };
		name: string;
	}>;
}

export const PokeApi = (fetch: Fetch, imgSerializer: ImgSerializer) => {
	const requestJson = RequestJson(fetch);
	const requestArrayBuffer = RequestArrayBuffer(fetch);
	const pokemon = (id: string) =>
		requestJson<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);

	return {
		pokemon: async (id: string): Promise<Pokemon> => {
			const pokemonResponse = await pokemon(id);
			const species = await requestJson<SpeciesResponse>(pokemonResponse.species.url);
			const types = await Promise.all(
				pokemonResponse.types.map((type) => requestJson<TypeResponse>(type.type.url))
			);
			const picture = await requestArrayBuffer(
				`/img/${pokemonResponse.id.toString().padStart(3, '0')}.png`
			);

			return {
				id: pokemonResponse.id.toString(),
				name: species.names.find((x) => x.language.name === 'en')!.name,
				picture: imgSerializer(picture),
				types: types.map((type) => ({
					name: type.names.find((x) => x.language.name === 'en')!.name,
					color: 'red'
				}))
			};
		}
	};
};
