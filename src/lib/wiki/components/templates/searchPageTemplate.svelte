<script lang="ts">
	import SearchHeaderBlock from '$lib/wiki/components/blocks/search/searchHeaderBlock.svelte';
	import SearchResultsBlock from '$lib/wiki/components/blocks/search/searchResultsBlock.svelte';
	import type { SearchResult } from '@nemowiki/core/types';

	let { results }: { results: SearchResult[] } = $props();
</script>

<article>
	<SearchHeaderBlock />
	<SearchResultsBlock {results} />
</article>
