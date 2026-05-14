<script lang="ts">
	import type { Change } from '@nemowiki/core/types';
	import ComparePageTemplate from '$lib/wiki/components/templates/comparePageTemplate.svelte';

	let { data } = $props();
	let diff = $derived<Change[] | null>(data.diff);
	let oldRev = $derived<number>(data.oldRev);
	let newRev = $derived<number>(data.newRev);
</script>

<ComparePageTemplate {diff} {oldRev} {newRev} />
