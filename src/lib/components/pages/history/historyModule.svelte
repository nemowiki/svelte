<script lang="ts">
	import { page } from '$app/state';
	import LogList from '$lib/components/common/logList.svelte';
	import postReq from '$lib/utils/postReq.js';
	import type { DocLogDoc, WikiResponseWithData } from '@nemowiki/core/types';
	import { encodeFullTitle } from '@nemowiki/core/client';

	let { fullTitle, initial_logArr } = $props();

	let pageIdx = $state<number>(Number(page.url.searchParams.get('page')) || 1);
	let logArr = $state<DocLogDoc[]>(initial_logArr);
	// let logArr = $derived<DocLogDoc[]>(updatedLogArr || initial_logArr);

	async function loadMoreLogs(loadType: 'prev' | 'next') {
		if (loadType === 'prev') {
			pageIdx -= 1;
		} else if (loadType === 'next') {
			pageIdx += 1;
		}

		window.history.pushState({}, '', `/h/${encodeFullTitle(fullTitle)}?page=${pageIdx}`);

		const res = (await postReq('/api/log/doc', {
			fullTitle,
			pageIdx
		})) as WikiResponseWithData<DocLogDoc[]>;

		if (res.ok) {
			logArr = res.data;
		} else {
			alert(res.reason);
		}
	}
</script>

{#snippet PrevBtn()}
	<button disabled={pageIdx === 1} onclick={() => loadMoreLogs('prev')}>이전</button>
{/snippet}

{#snippet NextBtn()}
	<button
		disabled={logArr.at(-1)?.revision === 1 && logArr.at(-1)?.action === 'create'}
		onclick={() => loadMoreLogs('next')}>다음</button
	>
{/snippet}

<div id="history-div">
	<LogList {logArr} pageType={'hist'} />
	{@render PrevBtn()}
	{@render NextBtn()}
</div>
