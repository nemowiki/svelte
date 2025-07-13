<script lang="ts">
	import { page } from '$app/state';
	import CommonHeader from '$lib/wiki/components/common/commonHeader.svelte';
	// import DocHeader from '$lib/wiki/components/common/docHeader.svelte';

	const fullTitle = $derived(
		page.params.fullTitle || '사용자:' + page.params.userName || '검색:' + page.params.query || ''
	);
</script>

<CommonHeader title={`오류:${fullTitle}`} />
<article>
	<p>{page.error?.message || ''}</p>
</article>
