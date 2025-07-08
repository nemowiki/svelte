<script lang="ts">
	import type { DocLogDoc } from '@nemowiki/core/types';
	import HistoryModule from '$lib/components/pages/history/historyModule.svelte';
	import HistoryHeader from '$lib/components/pages/history/historyHeader.svelte';

	let { data } = $props();

	let logArr = $derived<DocLogDoc[]>(JSON.parse(data.logArr || '[]'));
</script>

<article>
	<HistoryHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else if logArr.length === 0}
		<p>역사가 존재하지 않습니다.</p>
	{:else}
		<HistoryModule initial_logArr={logArr} />
	{/if}
</article>
