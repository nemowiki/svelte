<script lang="ts">
	import type { DocLogDoc, WikiResponse } from '@nemowiki/core/types';
	import { page } from '$app/state';
	import postReq from '$lib/utils/postReq.js';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import LogList from '$lib/components/common/logList.svelte';

	let pageIdx = $state<number>(Number(page.url.searchParams.get('page')) || 1);

	let { queriedUser, initial_logArr } = $props();

	let logArr = $state<DocLogDoc[]>(initial_logArr);

	async function loadMoreLogs(loadType: 'prev' | 'next') {
		if (loadType === 'prev') {
			pageIdx -= 1;
		} else if (loadType === 'next') {
			pageIdx += 1;
		}

		window.history.pushState({}, '', `/u/${encodeFullTitle(queriedUser.name)}?page=${pageIdx}`);

		const res = (await postReq('/api/log/user', {
			userName: queriedUser.name,
			pageIdx
		})) as WikiResponse<DocLogDoc[]>;

		if (res.ok) {
			logArr = res.value;
		} else {
			alert(res.reason);
		}
	}
</script>

{#snippet PrevBtn()}
	<button disabled={pageIdx === 1} onclick={() => loadMoreLogs('prev')}>이전</button>
{/snippet}

{#snippet NextBtn()}
	<button disabled={pageIdx * 10 >= queriedUser.contribCnt} onclick={() => loadMoreLogs('next')}
		>다음</button
	>
{/snippet}

<div id="user-contribute-div">
	<h3>기여 내역</h3>
	{#if logArr.length === 0}
		<p>기여 내역이 없습니다.</p>
	{:else}
		<LogList {logArr} pageType="user" />
		{@render PrevBtn()}
		{@render NextBtn()}
	{/if}
</div>

<style lang="scss">
	h3 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
</style>
