<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p><span>[오류]</span> {@render children()}</p>
{/if}

<style>
	p {
		background-color: var(--color-error-back);
		border-bottom: solid 0.1rem var(--color-error);
		border-top: solid 0.1rem var(--color-error);
		margin: 0.5rem 0;
		padding: 0.25rem 0.5rem;
	}
	p span {
		color: var(--color-error);
		font-weight: bold;
	}
</style>
