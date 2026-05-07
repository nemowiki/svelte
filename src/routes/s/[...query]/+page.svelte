<script lang="ts">
	import type { SearchResult } from '@nemowiki/core/types';

	import SearchHeader from '$lib/wiki/components/pages/search/searchHeader.svelte';
	import SearchResults from '$lib/wiki/components/pages/search/searchResults.svelte';

	let { data } = $props();

	let results = $derived<Array<SearchResult>>(JSON.parse(data?.results || '[]'));
</script>

<article>
	<SearchHeader />
	<SearchResults {results} />
</article>
