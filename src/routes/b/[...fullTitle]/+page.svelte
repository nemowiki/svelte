<script lang="ts">
	import BacklinkHeader from '$lib/wiki/components/pages/backlink/backlinkHeader.svelte';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';

	let { data } = $props();

	let html = $derived<string>(data?.html || '');
</script>

<article>
	<BacklinkHeader />
	<HtmlContent content={html} />
</article>
