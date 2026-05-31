<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { DocPrefixes } from '@nemowiki/core/types';
</script>

<header>
	<h1><a href="/r/{encodeFullTitle(DocPrefixes.Wiki + ':대문')}">Wiki</a></h1>
	<div>
		<SearchModule />
	</div>
	<nav>
		<UploadModule />
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
		padding: 0.6rem 6%;
		background-color: rgba(255, 254, 255, 0.92);
		backdrop-filter: blur(1rem);
		border-bottom: 0.1rem solid var(--color-line);
		box-shadow: 0 0.2rem 1rem var(--color-shadow);
	}

	h1 {
		flex: 0 0 9.6rem;
	}

	header > div {
		display: flex;
		justify-content: center;
		flex: 1;
		min-width: 0;
	}

	nav {
		display: flex;
		justify-content: flex-end;
		flex: 0 0 9.6rem;
		align-items: center;
	}

	a {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--color-primary-1);
		font-size: var(--font-lg);
		letter-spacing: 0.04rem;
	}

	a::before {
		content: '';
		width: 1.2rem;
		height: 0.2rem;
		border-radius: 2rem;
		background: linear-gradient(90deg, var(--color-primary-2), var(--color-primary-1));
		flex-shrink: 0;
	}

	a:hover {
		text-decoration: none;
		color: var(--color-primary-2);
	}
</style>
