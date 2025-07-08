<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import BacklinkBtn from '$lib/components/common/btns/backlinkBtn.svelte';
	import AuthorityBtn from '$lib/components/common/btns/authorityBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import HistoryBtn from '$lib/components/common/btns/historyBtn.svelte';

	let { oldRev, newRev }: { oldRev: number; newRev: number } = $props();

	const description = `(역사 비교 ${oldRev}&${newRev}번째 수정판)`;
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
