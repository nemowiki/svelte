<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import HistorySummaryList from '$lib/wiki/components/common/historySummaryList.svelte';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { DocActions, type HistorySummary } from '@nemowiki/core/types';

	const fullTitle = $derived<string>(page.params.fullTitle);
	let { historySummaries }: { historySummaries: HistorySummary[] } = $props();
	let pageIdx = $state<number>(Number(page.url.searchParams.get('page')) || 1);
	let loading = $state<boolean>(false);

	async function loadMoreHistorySummaries(loadType: 'prev' | 'next') {
		loading = true;
		pageIdx += loadType === 'next' ? 1 : -1;
		await goto(`/h/${encodeFullTitle(fullTitle)}?page=${pageIdx}`);
		loading = false;
	}
</script>

{#snippet PrevBtn()}
	<button disabled={loading || pageIdx === 1} onclick={() => loadMoreHistorySummaries('prev')}
		>이전</button
	>
{/snippet}

{#snippet NextBtn()}
	<button
		disabled={loading ||
			(historySummaries.at(-1)?.revision === 1 &&
				historySummaries.at(-1)?.action === DocActions.Create)}
		onclick={() => loadMoreHistorySummaries('next')}>다음</button
	>
{/snippet}

<div>
	<HistorySummaryList {historySummaries} pageType="history" />
	{@render PrevBtn()}
	{@render NextBtn()}
</div>

<style>
	button {
		margin-top: 0.5rem;
	}
</style>
