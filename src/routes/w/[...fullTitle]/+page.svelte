<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import WriteHeader from '$lib/components/pages/write/writeHeader.svelte';
	import WriteForm from '$lib/components/pages/write/writeForm.svelte';

	let { data } = $props();

	let doc = $derived<Doc | null>(JSON.parse(data.doc || 'null'));
</script>

<article>
	<WriteHeader info={doc} />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<WriteForm {doc} />
	{/if}
</article>
