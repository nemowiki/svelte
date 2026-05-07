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

<style lang="scss">
	@use '../../style/common/commonHeader.scss';
</style>
