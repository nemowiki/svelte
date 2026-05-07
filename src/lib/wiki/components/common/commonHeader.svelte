<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, description, Btns }: { children: Snippet; description?: string; Btns?: Snippet } =
		$props();
</script>

{#snippet TitleDiv()}
	<div class="title-div">
		<h1 class="doc-title">{@render children()}</h1>
		{#if description}
			<span class="doc-description">{description}</span>
		{/if}
	</div>
{/snippet}

{#snippet BtnNav()}
	<nav>
		{#if Btns}
			{@render Btns()}
		{/if}
	</nav>
{/snippet}

<header>
	{@render TitleDiv()}
	{@render BtnNav()}
</header>

<style>
	header {
		display: flex;
		align-items: flex-start;
		padding: 1rem;
		justify-content: space-between;
		min-width: 100%;
	}
	.title-div {
		width: 60%;
		position: relative;
	}
	.doc-title {
		font-size: 2.5rem;
	}
	.doc-description {
		position: relative;
		top: -0.25rem;
	}
	nav {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
</style>
