<script lang="ts">
	import AclPageTemplate from '$lib/wiki/components/templates/aclPageTemplate.svelte';

	let { data } = $props();

	let doc = $derived(data.doc);
	let aclDetails = $derived(data.aclDetails);
</script>

<AclPageTemplate {aclDetails} {doc} />
