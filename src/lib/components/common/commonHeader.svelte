<script lang="ts">
	let { description }: { description: string } = $props();
</script>

<header>
	<h1 id="doc-title">
		{description}
	</h1>
</header>

<style lang="scss">
	#doc-title {
		font-size: 2.5rem;
	}

	header {
		display: flex;
		align-items: center;
		padding: 1rem;
		justify-content: space-between;
	}
</style>
