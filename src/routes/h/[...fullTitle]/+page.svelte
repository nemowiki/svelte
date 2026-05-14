<script lang="ts">
	import HistoryPageTemplate from '$lib/wiki/components/templates/historyPageTemplate.svelte';

	let { data } = $props();
	let paginatedHistorySummaries = $derived(data.paginatedHistorySummaries);
</script>

<HistoryPageTemplate {paginatedHistorySummaries} />
