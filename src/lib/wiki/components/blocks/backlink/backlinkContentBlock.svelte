<script lang="ts">
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';

	let { html }: { html: string } = $props();
</script>

<HtmlContent content={html} />
