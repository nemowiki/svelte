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
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.6rem 0 1rem;
		margin-bottom: 1.2rem;
		border-bottom: 0.1rem solid var(--color-line);
	}

	.title-div {
		min-width: 0;
		flex: 1;
	}

	.doc-title {
		font-size: var(--font-xl);
		line-height: 1.1;
		font-weight: 700;
		letter-spacing: -0.04rem;
		word-break: break-all;
	}

	.doc-description {
		display: block;
		margin-top: 0.2rem;
		color: var(--color-gray-4);
		font-size: var(--font-sm);
	}

	nav {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
		justify-content: flex-end;
		flex-shrink: 0;
	}
</style>
