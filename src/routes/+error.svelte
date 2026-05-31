<script lang="ts">
	import { page } from '$app/state';
	import CommonHeader from '$lib/wiki/components/common/commonHeader.svelte';

	const fullTitle = $derived(
		page.params.fullTitle || '사용자:' + page.params.userName || '검색:' + page.params.query || ''
	);
</script>

<CommonHeader>{`[오류] ${fullTitle}`}</CommonHeader>

<article class="error-article">
	<p class="msg err"><span>[오류]</span> {page.error?.message || ''}</p>
	<button onclick={() => window.history.back()}>돌아가기</button>
</article>

<style>
	.error-article {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.4rem 0;
	}
</style>
