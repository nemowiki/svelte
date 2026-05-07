<script lang="ts">
	import StateFormBlock from '$lib/wiki/components/blocks/state/stateFormBlock.svelte';
	import StateHeaderBlock from '$lib/wiki/components/blocks/state/stateHeaderBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc } = $props();
</script>

<article>
	<StateHeaderBlock />
	<StateFormBlock {doc} />
</article>
