<script lang="ts">
	import { page } from '$app/state';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { Snippet } from 'svelte';

	let {
		Btns,
		description
	}: {
		Btns: Snippet;
		description?: string;
	} = $props();

	const fullTitle = $derived('사용자:' + page.params.userName);
</script>

{#snippet TitleDiv()}
	<div id="title-div">
		<h1 id="user-title">
			<a href="/u/{encodeFullTitle(fullTitle)}">{fullTitle}</a>
		</h1>
		<span id="user-description">{description}</span>
	</div>
{/snippet}

{#snippet BtnDiv()}
	<div id="btn-div">
		{@render Btns()}
	</div>
{/snippet}

<header>
	{@render TitleDiv()}
	{@render BtnDiv()}
</header>

<style lang="scss">
	#user-title {
		font-size: 2.5rem;

		a {
			color: black !important;
		}

		a:hover {
			text-decoration: underline;
			text-underline-offset: 0.4rem;
			text-decoration-thickness: 0.12rem;
		}
	}

	header {
		display: flex;
		align-items: center;
		padding: 1rem;
		justify-content: space-between;
	}
</style>
