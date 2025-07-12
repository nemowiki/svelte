<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';

	import ReadHeader from '$lib/components/pages/read/readHeader.svelte';
	import ReadCaution from '$lib/components/pages/read/readCaution.svelte';
	import HtmlContent from '$lib/components/common/htmlContent.svelte';

	let { data } = $props();

	let rev = $derived<number>(data?.value?.rev as number);
	let doc = $derived<Doc | null>(JSON.parse(data?.value?.doc || 'null'));

	let html = $derived<string>(doc?.html || '');
</script>

<article>
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<ReadHeader revision={doc?.revision || 0} />
		<ReadCaution ok={data.ok} {rev} />
		<HtmlContent content={html} />
	{/if}
</article>
