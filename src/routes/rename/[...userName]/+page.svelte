<script lang="ts">
	import RenameHeader from '$lib/wiki/components/pages/rename/renameHeader.svelte';
	import RenameForm from '$lib/wiki/components/pages/rename/renameForm.svelte';

	let { data } = $props();
</script>

<article>
	<RenameHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<RenameForm />
	{/if}
</article>
