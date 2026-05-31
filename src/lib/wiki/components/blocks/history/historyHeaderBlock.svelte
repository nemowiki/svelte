<script lang="ts">
	import AclBtn from '$lib/wiki/components/common/btns/aclBtn.svelte';
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let {
		doc
	}: {
		doc: Doc | null;
	} = $props();

	const description = '(역사 목록)';
</script>

{#snippet Buttons()}
	<ReadBtn />
	{#if doc?.permissions.canEdit}
		<WriteBtn />
	{/if}
	<BacklinkBtn />
	{#if doc?.permissions.canGrant}
		<AclBtn />
	{/if}
{/snippet}

<DocHeader {description} Btns={Buttons} />
