<script lang="ts">
	import PenaltyPageTemplate from '$lib/wiki/components/templates/penaltyPageTemplate.svelte';

	let { data } = $props();
	let penalties = $derived(data.penalties);
</script>

<PenaltyPageTemplate {penalties} />
