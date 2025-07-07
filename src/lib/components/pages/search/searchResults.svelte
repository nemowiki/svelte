<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { SearchResult } from '@nemowiki/core/types';

	let { searchWord, resultArr }: { searchWord: string; resultArr: Array<SearchResult> } = $props();

	function readDoc(_fullTitle: string): void {
		goto(`/r/${encodeFullTitle(_fullTitle)}`);
	}

	function writeDoc(_fullTitle: string): void {
		goto(`/w/${encodeFullTitle(_fullTitle)}`);
	}
</script>

{#snippet newDocBtn()}
	<button onclick={() => writeDoc(searchWord)}>
		"{searchWord}" 문서를 생성하시겠습니까?
	</button>
{/snippet}

{#snippet ResultBtns()}
	{#each resultArr as result}
		<button onclick={() => readDoc(result.original)}>
			{result.original}
		</button>
	{/each}
{/snippet}

<div id="search-results-div">
	{@render newDocBtn()}
	{@render ResultBtns()}
</div>

<style lang="scss">
	button {
		width: stretch;
		margin: 1rem;
		border: 0.2rem black solid;
		padding: 1rem;
		font-weight: bold;
		font-size: 1rem;
		text-align: left;
	}
</style>
