<script lang="ts">
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import StateBtn from '$lib/wiki/components/common/btns/stateBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let {
		doc
	}: {
		doc: Doc;
	} = $props();

	const description = '(권한 목록)';
</script>

{#snippet Buttons()}
	{#if doc.permissions.canEdit}
		<WriteBtn />
	{/if}
	<HistoryBtn />
	<BacklinkBtn />
	{#if doc.permissions.canToggle}
		<StateBtn />
	{/if}
{/snippet}

<DocHeader {description} Btns={Buttons} />
