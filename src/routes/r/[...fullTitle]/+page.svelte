<script lang="ts">
	import { page } from '$app/state';
	import ReadPageTemplate from '$lib/wiki/components/templates/readPageTemplate.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { data } = $props();

	let rev = $derived<number>(Number(page.url.searchParams.get('rev') || '-1') || -1);
	let from = $derived<string | null>(page.url.searchParams.get('from'));
	let doc = $derived<Doc | null>(JSON.parse(data?.doc || 'null'));
</script>

<ReadPageTemplate {doc} {rev} {from} />
