<script lang="ts">
	import ReadPageTemplate from '$lib/wiki/components/templates/readPageTemplate.svelte';

	let { data } = $props();

	let rev = $derived(data.rev);
	let from = $derived(data.from);
	let doc = $derived(data.doc);
</script>

<ReadPageTemplate {doc} {rev} {from} />
