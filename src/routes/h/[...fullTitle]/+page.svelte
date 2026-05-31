<script lang="ts">
	import HistoryPageTemplate from '$lib/wiki/components/templates/historyPageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(data.doc);
	let paginatedHistorySummaries = $derived(data.paginatedHistorySummaries);
</script>

<HistoryPageTemplate {doc} {paginatedHistorySummaries} />
