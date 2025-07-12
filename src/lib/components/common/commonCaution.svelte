<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p class="caution">{@render children()}</p>
{/if}

<style lang="scss">
	.caution {
		// border: rgb(255, 100, 100) .1rem solid;
		// border-radius: .5rem;

		border-bottom: solid 0.1rem orange;
		border-top: solid 0.1rem orange;
		background-color: rgb(255, 240, 235);

		padding: 0.1rem 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
