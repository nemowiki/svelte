<script lang="ts">
	import AclBtn from '$lib/wiki/components/common/btns/aclBtn.svelte';
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	let { revision }: { revision: number } = $props();
	const description = $derived(`${revision}번째 수정판`);
</script>

{#snippet Buttons()}
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
	<AclBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
