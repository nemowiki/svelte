<script lang="ts">
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';

	let { html }: { html: string } = $props();
</script>

{#if html}
	<HtmlContent content={html} />
{:else}
	<CommonWarn>역링크가 존재하지 않습니다.</CommonWarn>
{/if}
