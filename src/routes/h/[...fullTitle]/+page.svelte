<script lang="ts">
	import type { PaginatedResponse, HistorySummary } from '@nemowiki/core/types';
	import HistoryPageTemplate from '$lib/wiki/components/templates/historyPageTemplate.svelte';

	let { data } = $props();
	let historySummaries = $derived<PaginatedResponse<HistorySummary>>(
		JSON.parse(data?.historySummaries || '{}')
	);
</script>

<HistoryPageTemplate {historySummaries} />
