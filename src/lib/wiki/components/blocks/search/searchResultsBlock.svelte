<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { SearchResult } from '@nemowiki/core/types';
	import FilePlus from '@lucide/svelte/icons/file-plus';
	import FileText from '@lucide/svelte/icons/file-text';

	let { results }: { results: SearchResult[] } = $props();
	const query = $derived<string>(page.params.query);

	function readDoc(fullTitle: string): void {
		goto(`/r/${encodeFullTitle(fullTitle)}`);
	}

	function writeDoc(fullTitle: string): void {
		goto(`/w/${encodeFullTitle(fullTitle)}`);
	}
</script>

<div class="results">
	<button class="new-btn" onclick={() => writeDoc(query)}>
		<FilePlus size="1rem" />
		<span>"{query}" 문서 생성</span>
	</button>
	{#each results as result (result.original)}
		<button class="soft-list-btn" onclick={() => readDoc(result.original)}>
			<FileText size="1rem" />
			{result.original}
		</button>
	{/each}
</div>

<style>
	.results {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.new-btn {
		width: 100%;
		padding: 0.6rem 1rem;
		justify-content: flex-start;
		border-radius: 0.8rem;
		border-color: var(--color-info);
		background-color: var(--color-info-back);
		color: var(--color-info);
		font-size: var(--font-md);
	}
	.new-btn:hover {
		background-color: var(--color-info-hover);
		color: var(--color-info);
		border-color: var(--color-info);
	}
</style>
