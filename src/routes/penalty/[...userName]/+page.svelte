<script lang="ts">
	import type { Penalty } from '@nemowiki/core/types';
	import PenaltyPageTemplate from '$lib/wiki/components/templates/penaltyPageTemplate.svelte';

	let { data } = $props();
	let penalties = $derived<Penalty[]>(JSON.parse(data?.penalties || '[]'));
</script>

<PenaltyPageTemplate {penalties} />
