<script lang="ts">
	import StatePageTemplate from '$lib/wiki/components/templates/statePageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(JSON.parse(data?.doc || 'null'));
</script>

<StatePageTemplate {doc} />
