<script lang="ts">
	import type { Change } from '@nemowiki/core/types';
	import ComparePageTemplate from '$lib/wiki/components/templates/comparePageTemplate.svelte';

	let { data } = $props();
	let diff = $derived<Change[] | null>(JSON.parse(data?.diff || 'null'));
	let oldRev = $derived<number>(data?.oldRev as number);
	let newRev = $derived<number>(data?.newRev as number);
</script>

<ComparePageTemplate {diff} {oldRev} {newRev} />
