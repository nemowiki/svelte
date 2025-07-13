<script lang="ts">
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { DocLog } from '@nemowiki/core/types';
	import { page } from '$app/state';
	import { parseTimeOnly } from '$lib/wiki/utils/general.js';

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

<section>
	<h3>수정된 문서</h3>
	<hr />
	{#if !page.data.user}
		<p>로그인 후 사용 가능합니다.</p>
	{:else}
		{#each recentChangedLogs as log, i (i)}
			{#if i <= 10}
				{@render RecentLog(log)}
			{/if}
		{/each}
	{/if}
</section>

<style lang="scss">
	section {
		div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.25rem;
			a {
				word-break: break-all;
			}
		}
	}

	:global(hr) {
		margin: 0.2rem 0;
		border: gray 0.05em solid;
	}

	h3 {
		text-align: center;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
