<script lang="ts">
	import RegroupFormBlock from '$lib/wiki/components/blocks/regroup/regroupFormBlock.svelte';
	import RegroupHeaderBlock from '$lib/wiki/components/blocks/regroup/regroupHeaderBlock.svelte';

	let {
		canRename,
		canPenalty
	}: {
		canRename: boolean;
		canPenalty: boolean;
	} = $props();
</script>

<article>
	<RegroupHeaderBlock {canRename} {canPenalty} />
	<RegroupFormBlock />
</article>
