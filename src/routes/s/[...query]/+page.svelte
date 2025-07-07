<script lang="ts">
	import type { SearchResult } from '@nemowiki/core/types';
	import SearchResults from '$lib/components/pages/search/searchResults.svelte';
	import CommonHeader from '$lib/components/common/commonHeader.svelte';

	let { data } = $props();

	let resultArr = $derived<Array<SearchResult>>(JSON.parse(data.result || '[]'));
	let searchWord = $derived<string>(data.query as string);
</script>

<CommonHeader description={`"${searchWord}"에 대한 검색 결과:`} />
<SearchResults {searchWord} {resultArr} />
