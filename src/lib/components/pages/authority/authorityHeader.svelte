<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import HistoryBtn from '$lib/components/common/btns/historyBtn.svelte';
	import BacklinkBtn from '$lib/components/common/btns/backlinkBtn.svelte';
	import RestateBtn from '$lib/components/common/btns/restateBtn.svelte';
	import { type Info } from '@nemowiki/core/types';

	let { info }: { info: Info | null } = $props();

	const description = '(권한 목록)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
	<RestateBtn {info} />
{/snippet}

<DocHeader {description} {Btns} />
