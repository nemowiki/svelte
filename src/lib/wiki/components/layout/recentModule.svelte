<script lang="ts">
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { DocLog } from '@nemowiki/core/types';
	import { page } from '$app/state';
	import { parseTimeOnly } from '$lib/wiki/utils/general.js';
	import { PUBLIC_REQUIRE_LOGIN } from '$env/static/public';

	let recentChangedLogs: DocLog[] = $derived.by(() => {
		return removeDeletedOrHidden(removeDuplication(JSON.parse(page.data.logs)));
	});

	function removeDeletedOrHidden(logArr: DocLog[]): DocLog[] {
		const fullTitleArr = JSON.parse(page.data.fullTitles);
		return logArr.filter((log) => {
			return fullTitleArr.includes(log.fullTitle);
		});
	}

	function removeDuplication(logArr: DocLog[]): DocLog[] {
		const fullTitleSet = new Set<string>();
		return logArr.filter((log) => {
			if (fullTitleSet.has(log.fullTitle)) {
				return false;
			} else {
				fullTitleSet.add(log.fullTitle);
				return true;
			}
		});
	}
</script>

{#snippet RecentLog(log: DocLog)}
	<div>
		<a title={log.fullTitle} href="/r/{encodeFullTitle(log.fullTitle)}">
			{log.fullTitle}
		</a>
		<span>{parseTimeOnly(log.time)}</span>
	</div>
	<hr />
{/snippet}

<section class="module">
	<h2>수정된 문서</h2>
	<hr />
	{#if PUBLIC_REQUIRE_LOGIN === 'true'}
		<p>로그인 필요</p>
	{:else}
		{#each recentChangedLogs as log, i (i)}
			{#if i <= 10}
				{@render RecentLog(log)}
			{/if}
		{/each}
	{/if}
</section>

<style lang="scss">
	@use '../../style/layout/recentModule.scss';
</style>
