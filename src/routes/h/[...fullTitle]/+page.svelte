<script lang="ts">
	import type { HistorySummary } from '@nemowiki/core/types';
	import HistoryList from '$lib/wiki/components/pages/history/historyList.svelte';
	import HistoryHeader from '$lib/wiki/components/pages/history/historyHeader.svelte';

	let { data } = $props();

	let historySummaries = $derived<HistorySummary[]>(
		JSON.parse(data?.historySummaries || '[]')
	);
</script>

<article>
	<HistoryHeader />
	<HistoryList {historySummaries} />
</article>
