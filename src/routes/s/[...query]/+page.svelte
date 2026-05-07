<script lang="ts">
	import type { SearchResult } from '@nemowiki/core/types';
	import SearchPageTemplate from '$lib/wiki/components/templates/searchPageTemplate.svelte';

	let { data } = $props();
	let results = $derived<SearchResult[]>(JSON.parse(data?.results || '[]'));
</script>

<SearchPageTemplate {results} />
