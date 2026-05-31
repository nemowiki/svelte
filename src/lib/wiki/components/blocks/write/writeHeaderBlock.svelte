<script lang="ts">
	import DeleteBtn from '$lib/wiki/components/common/btns/deleteBtn.svelte';
	import GrammarBtn from '$lib/wiki/components/common/btns/grammarBtn.svelte';
	import MoveBtn from '$lib/wiki/components/common/btns/moveBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let {
		doc
	}: {
		doc: Doc;
	} = $props();

	const description = $derived(`${doc.revision + 1}번째 수정`);
</script>

{#snippet Buttons()}
	<ReadBtn />
	<GrammarBtn />
	{#if doc.permissions.canMove}
		<MoveBtn />
	{/if}
	{#if doc.permissions.canDelete}
		<DeleteBtn />
	{/if}
{/snippet}

<DocHeader {description} Btns={Buttons} />
