<script lang="ts">

	import { onMount } from 'svelte';

	onMount(() => {
		console.log('page2.onMount')
	});

	console.log("page2.root");
</script>

<main>
	<h1>This is page 2</h1>

	<a href='/'>Back to page 1</a>
</main>