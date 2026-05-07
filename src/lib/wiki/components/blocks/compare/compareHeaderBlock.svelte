<script lang="ts">
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	let { oldRev, newRev }: { oldRev: number; newRev: number } = $props();

	const description = `(역사 비교 ${oldRev}·${newRev}번째 수정판)`;
</script>

{#snippet Buttons()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
