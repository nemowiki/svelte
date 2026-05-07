<script lang="ts">
	import CompareContentBlock from '$lib/wiki/components/blocks/compare/compareContentBlock.svelte';
	import CompareHeaderBlock from '$lib/wiki/components/blocks/compare/compareHeaderBlock.svelte';
	import type { Change } from '@nemowiki/core/types';

	let { diff, oldRev, newRev }: { diff: Change[] | null; oldRev: number; newRev: number } =
		$props();
</script>

<article>
	<CompareHeaderBlock {oldRev} {newRev} />
	<CompareContentBlock {diff} />
</article>
