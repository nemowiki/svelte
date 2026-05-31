<script lang="ts">
	import CompareContentBlock from '$lib/wiki/components/blocks/compare/compareContentBlock.svelte';
	import CompareHeaderBlock from '$lib/wiki/components/blocks/compare/compareHeaderBlock.svelte';
	import type { Change, Doc } from '@nemowiki/core/types';

	let {
		diff,
		doc,
		oldRev,
		newRev
	}: { diff: Change[] | null; doc: Doc | null; oldRev: number; newRev: number } = $props();
</script>

<article>
	<CompareHeaderBlock {doc} {oldRev} {newRev} />
	<CompareContentBlock {diff} />
</article>
