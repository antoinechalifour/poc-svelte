<script lang='ts' context='module'>
	import type { Load } from '@sveltejs/kit';

	export const load: Load = () => {
		return {
			status: 303,
			redirect: `/pokemon/${Math.floor(Math.random() * 932) + 1}`
		};
	};
</script>
