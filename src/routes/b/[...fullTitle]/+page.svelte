<script lang="ts">
	import BacklinkHeader from '$lib/components/pages/backlink/backlinkHeader.svelte';
	import HtmlContent from '$lib/components/common/htmlContent.svelte';

	let { data } = $props();

	let html = $derived<string | null>(data.html);
</script>

<article>
	<BacklinkHeader />
	{#if !html}
		<p>역링크가 존재하지 않습니다.</p>
	{:else}
		<HtmlContent content={html} />
	{/if}
</article>
