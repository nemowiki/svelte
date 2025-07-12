<script lang="ts">
	import DeleteHeader from '$lib/components/pages/delete/deleteHeader.svelte';
	import DeleteForm from '$lib/components/pages/delete/deleteForm.svelte';

	let { data } = $props();
</script>

<article>
	<DeleteHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<DeleteForm />
	{/if}
</article>
