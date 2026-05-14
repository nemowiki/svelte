<script lang="ts">
	import WritePageTemplate from '$lib/wiki/components/templates/writePageTemplate.svelte';

	let { data } = $props();
	let doc = $derived(data.doc);
</script>

<WritePageTemplate {doc} />
