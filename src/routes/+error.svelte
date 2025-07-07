<script lang="ts">
	import { page } from '$app/state';
	import CommonHeader from '$lib/components/common/commonHeader.svelte';
	// import DocHeader from '$lib/components/common/docHeader.svelte';

	const fullTitle = $derived(page.error?.fullTitle || '');
</script>

<CommonHeader description={`오류 또는 권한 부족: ${fullTitle}`} />
<article>
	<p>{page.error?.message || ''}</p>
</article>
