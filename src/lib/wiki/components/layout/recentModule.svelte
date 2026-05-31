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
			}

			seenFullTitles.add(historySummary.fullTitle);
			return true;
		});
	}
</script>

{#snippet RecentLog(historySummary: HistorySummary)}
	<div class="list-row">
		<a title={historySummary.fullTitle} href="/r/{encodeFullTitle(historySummary.fullTitle)}">
			{historySummary.fullTitle}
		</a>
		<span>{parseTimeOnly(historySummary.createdAt)}</span>
	</div>
{/snippet}

<section class="module">
	<h2>최근 수정</h2>
	{#if page.data.user.group === Groups.Guest && PUBLIC_REQUIRE_LOGIN === 'true'}
		<p>로그인이 필요합니다.</p>
	{:else}
		<div class="list-col">
			{#each recentChangedHistorySummaries as historySummary, i (i)}
				{#if i <= 10}
					{@render RecentLog(historySummary)}
				{/if}
			{/each}
		</div>
	{/if}
</section>

<style>
	a {
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: var(--font-sm);
		color: var(--color-text);
		font-weight: 400;
	}

	a:hover {
		color: var(--color-primary-1);
		text-decoration: none;
	}

	span {
		color: var(--color-gray-4);
		font-size: var(--font-sm);
		white-space: nowrap;
		flex-shrink: 0;
	}

	p {
		text-align: center;
		color: var(--color-gray-4);
		font-size: var(--font-sm);
		padding: 0.4rem 0;
	}
</style>
