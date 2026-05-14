<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import HistorySummaryList from '$lib/wiki/components/common/historySummaryList.svelte';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { type HistorySummary, type PaginatedResponse } from '@nemowiki/core/types';

	const fullTitle = $derived<string>(page.params.fullTitle);
	let {
		paginatedHistorySummaries
	}: { paginatedHistorySummaries: PaginatedResponse<HistorySummary> } = $props();

	let pageIdx = $derived(paginatedHistorySummaries.currentPage);

	let loading = $state<boolean>(false);

	async function loadMoreHistorySummaries(loadType: 'prev' | 'next') {
		loading = true;
		pageIdx += loadType === 'next' ? 1 : -1;
		await goto(`/h/${encodeFullTitle(fullTitle)}?page=${pageIdx}`);
		loading = false;
	}
</script>

{#snippet PrevBtn()}
	<button
		disabled={loading || !paginatedHistorySummaries.hasPrev}
		onclick={() => loadMoreHistorySummaries('prev')}>이전</button
	>
{/snippet}

{#snippet NextBtn()}
	<button
		disabled={loading || !paginatedHistorySummaries.hasNext}
		onclick={() => loadMoreHistorySummaries('next')}>다음</button
	>
{/snippet}

<div>
	<HistorySummaryList historySummaries={paginatedHistorySummaries.items} pageType="history" />
	{@render PrevBtn()}
	{@render NextBtn()}
</div>

<style>
	button {
		margin-top: 0.5rem;
	}
</style>
