<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import HistorySummaryList from '$lib/wiki/components/common/historySummaryList.svelte';
	import type { HistorySummary, PaginatedResponse } from '@nemowiki/core/types';

	let {
		userName,
		historySummaries,
		variant = 'list'
	}: {
		userName: string;
		historySummaries: PaginatedResponse<HistorySummary>;
		variant?: 'list' | 'card';
	} = $props();

	function gotoPage(page: number): void {
		goto(`/u/${encodeFullTitle(userName)}?page=${page}`);
	}
</script>

{#snippet PrevPageBtn()}
	<button
		disabled={!historySummaries.hasPrev}
		onclick={() => gotoPage(historySummaries.currentPage - 1)}>이전</button
	>
{/snippet}

{#snippet NextPageBtn()}
	<button
		disabled={!historySummaries.hasNext}
		onclick={() => gotoPage(historySummaries.currentPage + 1)}>다음</button
	>
{/snippet}

<div class:user-contribution-card={variant === 'card'}>
	<h3>기여 내역</h3>
	{#if historySummaries.items.length === 0}
		<p>기여 내역이 없습니다.</p>
	{:else}
		<HistorySummaryList historySummaries={historySummaries.items} pageType="user" />
		{@render PrevPageBtn()}
		{@render NextPageBtn()}
	{/if}
</div>

<style>
	h3 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
	button {
		margin-top: 0.5rem;
	}
</style>
