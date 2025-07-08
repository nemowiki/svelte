<script lang="ts">
	import { page } from '$app/state';
	import CommonHeader from '$lib/components/common/commonHeader.svelte';
	// import DocHeader from '$lib/components/common/docHeader.svelte';

	const fullTitle = $derived(page.error?.fullTitle || '');
</script>

<CommonHeader title={`오류: ${fullTitle}`} />
<article>
	<p>{page.error?.message || ''}</p>
</article>
