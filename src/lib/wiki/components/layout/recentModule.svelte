<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_REQUIRE_LOGIN } from '$env/static/public';
	import { parseTimeOnly } from '$lib/wiki/utils/general.js';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { HistorySummary } from '@nemowiki/core/types';
	import { Groups } from '@nemowiki/core/types';

	let recentChangedHistorySummaries: HistorySummary[] = $derived.by(() => {
		return removeDeletedOrHidden(removeDuplication(page.data.recentHistorySummaries));
	});

	function removeDeletedOrHidden(historySummaries: HistorySummary[]): HistorySummary[] {
		const fullTitles = page.data.fullTitles;
		return historySummaries.filter((historySummary) => {
			return fullTitles.includes(historySummary.fullTitle);
		});
	}

	function removeDuplication(historySummaries: HistorySummary[]): HistorySummary[] {
		const seenFullTitles = new Set<string>();
		return historySummaries.filter((historySummary) => {
			if (seenFullTitles.has(historySummary.fullTitle)) {
				return false;
			} else {
				seenFullTitles.add(historySummary.fullTitle);
				return true;
			}
		});
	}
</script>

{#snippet RecentLog(historySummary: HistorySummary)}
	<div>
		<a title={historySummary.fullTitle} href="/r/{encodeFullTitle(historySummary.fullTitle)}">
			{historySummary.fullTitle}
		</a>
		<span>{parseTimeOnly(historySummary.createdAt)}</span>
	</div>
	<hr />
{/snippet}

<section class="module">
	<h2>최근 수정</h2>
	<hr />
	{#if page.data.user.group === Groups.Guest && PUBLIC_REQUIRE_LOGIN === 'true'}
		<p>로그인 필요</p>
	{:else}
		{#each recentChangedHistorySummaries as historySummary, i (i)}
			{#if i <= 10}
				{@render RecentLog(historySummary)}
			{/if}
		{/each}
	{/if}
</section>

<style>
	section {
		margin-left: 0;
		padding: 1rem;
	}
	section div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.25rem;
	}
	section div a {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	section p {
		text-align: center;
		font-weight: bold;
	}
	hr {
		margin: 0.25rem 0;
		border: gray 0.05em solid;
	}
	h2 {
		text-align: center;
		font-size: 1.25rem;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
