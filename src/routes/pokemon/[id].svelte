<script lang='ts' context='module'>
	import type { Load } from '@sveltejs/kit';
	import { PokeApi } from '$lib/PokeApi';

	export const load: Load = async ({ fetch, page }) => ({
		props: {
			pokemon: await PokeApi(fetch).pokemon(page.params.id)
				.catch(err => {
					console.log(err);
					throw err;
				})
		}
	});
</script>

<script lang='ts'>
	import type { Pokemon } from '$lib/Pokemon';
	import { scale, blur } from 'svelte/transition';

	export let pokemon: Pokemon;
</script>

<svelte:head>
	<title>#{pokemon.id} {pokemon.name}</title>
</svelte:head>

<main style='--color-pokemon: var(--color-{pokemon.types[0].name.toLowerCase()});'>
	{#key pokemon.id}
		<div>
			<img in:scale out:scale src={pokemon.picture} alt={pokemon.name}>
			<h1 in:blur out:blur>#{pokemon.id} {pokemon.name}</h1>
			<a href='/'>Give me another pokemon</a>
		</div>
	{/key}
</main>

<style>
    main {
        position: relative;
        min-height: 100vh;
        display: grid;
        place-content: center;
        text-align: center;
        overflow: hidden;
        transition: background .4s ease;
        background: var(--color-pokemon);
    }

    main:before {
        position: absolute;
        content: '';
        display: block;
        height: 75%;
        width: 200%;
        bottom: -25%;
        background: rgba(0, 0, 0, .25);
        transform: rotate(-12deg);
        pointer-events: none;
    }

    main > * {
        grid-column: 1;
        grid-row: 1;
        position: relative;
    }

    img {
        display: block;
        width: 100%;
        max-width: 450px;
    }

    h1 {
        font-size: 3rem;
        padding: 1.6rem 3.2rem;
        margin-bottom: 3.2rem;
        border-radius: .8rem;
        border: .4rem solid rgba(0, 0, 0, .8);
        color: #fff;
        background: rgba(0, 0, 0, .75);
    }

    a {
        font-size: 1.6rem;
        background: rgba(255, 255, 255, .75);
        padding: 1rem 2rem;
        text-decoration: none;
        color: #373737;
        border-radius: .5rem;
        box-shadow: inset 0 1px 2px var(--color-pokemon);
    }

    img {
        filter: drop-shadow(0 1px 6px rgba(0, 0, 0, .25));
    }
</style>