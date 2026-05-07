<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { SearchResult } from '@nemowiki/core/types';

	let { results }: { results: SearchResult[] } = $props();
	const query = $derived<string>(page.params.query);

	function readDoc(fullTitle: string): void {
		goto(`/r/${encodeFullTitle(fullTitle)}`);
	}

	function writeDoc(fullTitle: string): void {
		goto(`/w/${encodeFullTitle(fullTitle)}`);
	}
</script>

{#snippet NewDocBtn()}
	<button class="new-doc-btn" onclick={() => writeDoc(query)}>
		"{query}" 문서를 생성하시겠습니까?
	</button>
{/snippet}

{#snippet ResultButtons()}
	{#each results as result (result.original)}
		<button onclick={() => readDoc(result.original)}>
			{result.original}
		</button>
	{/each}
{/snippet}

<div class="search-results-div">
	{@render NewDocBtn()}
	{@render ResultButtons()}
</div>

<style>
	.search-results-div {
		display: flex;
		flex-direction: column;
	}
	button {
		width: stretch;
		margin: 0.5rem;
		border: 0.1rem gray solid;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		text-align: left;
	}
	.new-doc-btn {
		border: none;
		border-bottom: solid 0.1rem var(--color-info);
		border-top: solid 0.1rem var(--color-info);
		background-color: var(--color-info-back);
	}
	.new-doc-btn:hover {
		background-color: var(--color-info-hover);
	}
</style>
