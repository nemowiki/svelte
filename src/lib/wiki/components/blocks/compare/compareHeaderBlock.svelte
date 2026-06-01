<script lang="ts">
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let {
		doc,
		oldRev,
		newRev
	}: {
		doc: Doc | null;
		oldRev: number;
		newRev: number;
	} = $props();

	const description = `(비교 ${oldRev}&${newRev}번째 수정본)`;
</script>

{#snippet Buttons()}
	<ReadBtn />
	{#if doc?.permissions.canEdit}
		<WriteBtn />
	{/if}
	<HistoryBtn />
	<BacklinkBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
