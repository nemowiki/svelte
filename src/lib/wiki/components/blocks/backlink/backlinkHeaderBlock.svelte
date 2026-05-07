<script lang="ts">
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	const description = '(역링크 목록)';
</script>

{#snippet Buttons()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
