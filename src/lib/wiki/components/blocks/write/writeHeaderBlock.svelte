<script lang="ts">
	import DeleteBtn from '$lib/wiki/components/common/btns/deleteBtn.svelte';
	import GrammarBtn from '$lib/wiki/components/common/btns/grammarBtn.svelte';
	import MoveBtn from '$lib/wiki/components/common/btns/moveBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	let { revision }: { revision: number } = $props();
	const description = $derived(`${revision + 1}번째 수정판`);
</script>

{#snippet Buttons()}
	<ReadBtn />
	<GrammarBtn />
	<MoveBtn />
	<DeleteBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
