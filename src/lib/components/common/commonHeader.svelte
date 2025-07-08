<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, description, Btns }: { title: string; description?: string; Btns?: Snippet } =
		$props();
</script>

{#snippet TitleDiv()}
	<div id="title-div">
		<h1 id="doc-title">{title}</h1>
		{#if description}
			<span id="doc-description">{description}</span>
		{/if}
	</div>
{/snippet}

{#snippet BtnDiv()}
	<div id="btn-div">
		{#if Btns}
			{@render Btns()}
		{/if}
	</div>
{/snippet}

<header>
	{@render TitleDiv()}
	{@render BtnDiv()}
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
