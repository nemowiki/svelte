<script lang="ts">
	import MovePageTemplate from '$lib/wiki/components/templates/movePageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(data.doc);
</script>

<MovePageTemplate {doc} />
