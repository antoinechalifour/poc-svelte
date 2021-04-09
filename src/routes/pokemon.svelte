<script lang='ts' context='module'>
	import type { Load } from '@sveltejs/kit';

	export const load: Load = () => ({
		status: 303,
		redirect: `/pokemon/${Math.floor(Math.random() * 898) + 1}`
	});
</script>
