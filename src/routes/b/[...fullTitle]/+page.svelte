<script lang="ts">
	import BacklinkPageTemplate from '$lib/wiki/components/templates/backlinkPageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(data.doc);
	let html = $derived<string>(data.html);
</script>

<BacklinkPageTemplate {doc} {html} />
