<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p><span>[알림]</span> {@render children()}</p>
{/if}

<style>
	p {
		background-color: var(--color-info-back);
		border-bottom: solid 0.1rem var(--color-info);
		border-top: solid 0.1rem var(--color-info);
		margin: 0.5rem 0;
		padding: 0.25rem 0.5rem;
	}
	p span {
		color: var(--color-info);
		font-weight: bold;
	}
</style>
