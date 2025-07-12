<script lang="ts">
	import RegroupHeader from '$lib/components/pages/regroup/regroupHeader.svelte';
	import RegroupForm from '$lib/components/pages/regroup/regroupForm.svelte';

	let { data } = $props();
</script>

<article>
	<RegroupHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<RegroupForm />
	{/if}
</article>
