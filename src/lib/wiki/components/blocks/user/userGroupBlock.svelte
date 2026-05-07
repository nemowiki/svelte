<script lang="ts">
	import type { Group } from '@nemowiki/core/types';

	let { group }: { group: Group } = $props();
</script>

<div>
	<h3>권한</h3>
	<p>권한 등급: {group}</p>
</div>

<style>
	h3 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
</style>
