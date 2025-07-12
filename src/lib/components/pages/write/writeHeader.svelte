<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import GrammarBtn from '$lib/components/common/btns/grammarBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import MoveBtn from '$lib/components/common/btns/moveBtn.svelte';
	import DeleteBtn from '$lib/components/common/btns/deleteBtn.svelte';

	let { revision }: { revision: number } = $props();

	const description = $derived(revision + 1 + '번째 수정판');
</script>

{#snippet Btns()}
	<ReadBtn />
	<GrammarBtn />
	<MoveBtn />
	<DeleteBtn />
{/snippet}

<DocHeader {description} {Btns} />
