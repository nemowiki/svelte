<script lang="ts">
	let { caution }: { caution: string } = $props();
</script>

{#if caution}
	<p class="caution">{caution}</p>
{/if}

<style lang="scss">
	.caution {
		// border: rgb(255, 100, 100) .1rem solid;
		// border-radius: .5rem;

		border-bottom: solid 0.1rem red;
		border-top: solid 0.1rem red;
		background-color: rgb(255, 240, 240);

		padding: 0.1rem 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
