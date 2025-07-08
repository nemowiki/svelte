<script lang="ts">
	import type { SearchResult } from '@nemowiki/core/types';

	import SearchHeader from '$lib/components/pages/search/searchHeader.svelte';
	import SearchResults from '$lib/components/pages/search/searchResults.svelte';

	let { data } = $props();

	let resultArr = $derived<Array<SearchResult>>(JSON.parse(data.result || '[]'));
</script>

<article>
	<SearchHeader />
	<SearchResults {resultArr} />
</article>
