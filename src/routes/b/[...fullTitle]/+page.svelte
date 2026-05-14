<script lang="ts">
	import BacklinkPageTemplate from '$lib/wiki/components/templates/backlinkPageTemplate.svelte';

	let { data } = $props();
	let html = $derived<string>(data.html);
</script>

<BacklinkPageTemplate {html} />
