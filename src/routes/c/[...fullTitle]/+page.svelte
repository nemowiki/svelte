<script lang="ts">
	import type { Change } from '@nemowiki/core/types';
	import CompareModule from '$lib/wiki/components/pages/compare/compareModule.svelte';
	import CompareHeader from '$lib/wiki/components/pages/compare/compareHeader.svelte';

	let { data } = $props();

	let diff = $derived<Change[] | null>(JSON.parse(data?.diff || 'null'));
	let oldRev = $derived<number>(data?.oldRev as number);
	let newRev = $derived<number>(data?.newRev as number);
</script>

<article>
	<CompareHeader {oldRev} {newRev} />
	<CompareModule {diff} />
</article>
