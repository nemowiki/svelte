<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';

	import ReadHeader from '$lib/components/pages/read/readHeader.svelte';
	import ReadCaution from '$lib/components/pages/read/readCaution.svelte';
	import HtmlContent from '$lib/components/common/htmlContent.svelte';

	let { data } = $props();

	let rev = $derived<number>(data.rev as number);
	let doc = $derived<Doc | null>(JSON.parse(data.doc || 'null'));

	let html = $derived<string>(doc?.html || '');
</script>

<article>
	<ReadHeader info={doc} />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<ReadCaution ok={data.ok} {rev} />
		<HtmlContent content={html} />
	{/if}
</article>
