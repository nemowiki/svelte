<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p><span>[주의]</span> {@render children()}</p>
{/if}

<style>
	p {
		background-color: var(--color-warn-back);
		border-bottom: solid 0.1rem var(--color-warn);
		border-top: solid 0.1rem var(--color-warn);
		margin: 0.5rem 0;
		padding: 0.25rem 0.5rem;
	}
	p span {
		color: var(--color-warn);
		font-weight: bold;
	}
</style>
