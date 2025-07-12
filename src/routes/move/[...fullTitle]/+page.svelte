<script lang="ts">
	import MoveHeader from '$lib/components/pages/move/moveHeader.svelte';
	import MoveForm from '$lib/components/pages/move/moveForm.svelte';

	let { data } = $props();
</script>

<article>
	<MoveHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<MoveForm />
	{/if}
</article>
