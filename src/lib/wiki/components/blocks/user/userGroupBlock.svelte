<script lang="ts">
	import type { Group } from '@nemowiki/core/types';

	let { group }: { group: Group } = $props();
</script>

<div>
	<h3>권한</h3>
	<p class="group-label">권한 등급: <strong>{group}</strong></p>
</div>

<style>
	.group-label {
		color: var(--color-sub);
		font-size: var(--font-sm);
		padding: 0.2rem 0;
	}
	strong {
		padding: 0.1rem 0.6rem;
		border-radius: 2rem;
		background-color: var(--color-primary-3);
		color: var(--color-primary-1);
	}
</style>
