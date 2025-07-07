<script lang="ts">
	import type { Info } from '@nemowiki/core/types';
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import GrammarBtn from '$lib/components/common/btns/grammarBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import MoveBtn from '$lib/components/common/btns/moveBtn.svelte';
	import DeleteBtn from '$lib/components/common/btns/deleteBtn.svelte';

	let { fullTitle, info }: { fullTitle: string; info: Info | null } = $props();

	const description = (info?.revision ?? 0) + 1 + '번째 수정판';
</script>

{#snippet Btns()}
	<ReadBtn />
	<GrammarBtn />
	<MoveBtn {info} />
	<DeleteBtn {info} />
{/snippet}

<DocHeader {fullTitle} {description} {Btns} />
