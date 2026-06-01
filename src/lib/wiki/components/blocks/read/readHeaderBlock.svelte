<script lang="ts">
	import AclBtn from '$lib/wiki/components/common/btns/aclBtn.svelte';
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let {
		doc
	}: {
		doc: Doc | null;
	} = $props();

	const description = $derived(`${doc?.revision ?? 0}번째 수정본`);
</script>

{#snippet Buttons()}
	{#if doc?.permissions.canEdit}
		<WriteBtn />
	{/if}
	{#if doc?.permissions.canRead}
		<HistoryBtn />
	{/if}
	<BacklinkBtn />
	{#if doc?.permissions.canGrant}
		<AclBtn />
	{/if}
{/snippet}

<DocHeader {description} Btns={Buttons} />
