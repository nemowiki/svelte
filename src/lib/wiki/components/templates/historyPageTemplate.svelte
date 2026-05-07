<script lang="ts">
	import HistoryHeaderBlock from '$lib/wiki/components/blocks/history/historyHeaderBlock.svelte';
	import HistoryListBlock from '$lib/wiki/components/blocks/history/historyListBlock.svelte';
	import type { PaginatedResponse, HistorySummary } from '@nemowiki/core/types';

	let { historySummaries }: { historySummaries: PaginatedResponse<HistorySummary> } = $props();
</script>

<article>
	<HistoryHeaderBlock />
	<HistoryListBlock historySummaries={historySummaries.items} />
</article>
