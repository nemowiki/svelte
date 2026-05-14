<script lang="ts">
	import HistoryHeaderBlock from '$lib/wiki/components/blocks/history/historyHeaderBlock.svelte';
	import HistoryListBlock from '$lib/wiki/components/blocks/history/historyListBlock.svelte';
	import type { HistorySummary, PaginatedResponse } from '@nemowiki/core/types';

	let {
		paginatedHistorySummaries
	}: { paginatedHistorySummaries: PaginatedResponse<HistorySummary> } = $props();
</script>

<article>
	<HistoryHeaderBlock />
	<HistoryListBlock {paginatedHistorySummaries} />
</article>
