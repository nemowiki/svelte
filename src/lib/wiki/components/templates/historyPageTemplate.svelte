<script lang="ts">
	import HistoryHeaderBlock from '$lib/wiki/components/blocks/history/historyHeaderBlock.svelte';
	import HistoryListBlock from '$lib/wiki/components/blocks/history/historyListBlock.svelte';
	import type { Doc, HistorySummary, PaginatedResponse } from '@nemowiki/core/types';

	let {
		doc,
		paginatedHistorySummaries
	}: { doc: Doc | null; paginatedHistorySummaries: PaginatedResponse<HistorySummary> } = $props();
</script>

<article>
	<HistoryHeaderBlock {doc} />
	<HistoryListBlock {paginatedHistorySummaries} />
</article>
