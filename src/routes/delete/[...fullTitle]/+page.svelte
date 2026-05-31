<script lang="ts">
	import DeletePageTemplate from '$lib/wiki/components/templates/deletePageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(data.doc);
</script>

<DeletePageTemplate {doc} />
