<script lang="ts">
	import StateHeader from '$lib/components/pages/state/stateHeader.svelte';
	import StateForm from '$lib/components/pages/state/stateForm.svelte';

	let { data } = $props();
</script>

<article>
	<StateHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<StateForm info={JSON.parse(data.value.info)} />
	{/if}
</article>
