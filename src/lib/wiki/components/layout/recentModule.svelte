<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_REQUIRE_LOGIN } from '$env/static/public';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { Groups } from '@nemowiki/core/types';
	import type { HistorySummary } from '@nemowiki/core/types';
	import { parseTimeOnly } from '$lib/wiki/utils/general.js';

	let recentChangedHistorySummaries: HistorySummary[] = $derived.by(() => {
		return removeDeletedOrHidden(removeDuplication(JSON.parse(page.data.historySummaries)));
	});

	function removeDeletedOrHidden(historySummaries: HistorySummary[]): HistorySummary[] {
		const fullTitles = JSON.parse(page.data.fullTitles);
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
	<h2>최근 변경 문서</h2>
	<hr />
	{#if JSON.parse(page.data.user).group === Groups.Guest && PUBLIC_REQUIRE_LOGIN === 'true'}
		<p>로그인 필요</p>
	{:else}
		{#each recentChangedHistorySummaries as historySummary, i (i)}
			{#if i <= 10}
				{@render RecentLog(historySummary)}
			{/if}
		{/each}
	{/if}
</section>

<style lang="scss">
	@use '../../style/layout/recentModule.scss';
</style>
