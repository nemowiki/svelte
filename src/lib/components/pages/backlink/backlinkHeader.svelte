<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import AuthorityBtn from '$lib/components/common/btns/authorityBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import HistoryBtn from '$lib/components/common/btns/historyBtn.svelte';

	let { fullTitle }: { fullTitle: string } = $props();

	const description = '(역링크 목록)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {fullTitle} {description} {Btns} />
