<script lang="ts">
	import StatePageTemplate from '$lib/wiki/components/templates/statePageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(data.doc);
</script>

<StatePageTemplate {doc} />
