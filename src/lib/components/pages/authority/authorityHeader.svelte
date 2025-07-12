<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import HistoryBtn from '$lib/components/common/btns/historyBtn.svelte';
	import BacklinkBtn from '$lib/components/common/btns/backlinkBtn.svelte';
	import StateBtn from '$lib/components/common/btns/stateBtn.svelte';

	const description = '(권한 목록)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
	<StateBtn />
{/snippet}

<DocHeader {description} {Btns} />
