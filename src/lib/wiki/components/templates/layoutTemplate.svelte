<script lang="ts">
	import type { Snippet } from 'svelte';
	import HeaderModule from '$lib/wiki/components/layout/headerModule.svelte';
	import FooterModule from '$lib/wiki/components/layout/footerModule.svelte';
	import ProfileModule from '$lib/wiki/components/layout/profileModule.svelte';
	import RecentModule from '$lib/wiki/components/layout/recentModule.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<HeaderModule />

<div class="layout-wrapper">
	<main class="wiki-main">
		{@render children()}
	</main>

	<aside class="wiki-aside">
		<ProfileModule />
		<RecentModule />
	</aside>
</div>

<FooterModule />

<style lang="scss">
	.layout-wrapper {
		display: flex;
		justify-content: center;
		flex: 1;
		gap: 1rem;
	}

	.wiki-main {
		padding: 1rem 2rem;
		max-width: 50rem;
		width: 100%;
	}

	.wiki-aside {
		width: 250px;
	}

	@media (max-width: 1024px) {
		.layout-wrapper {
			flex-direction: column;
			align-items: center;
		}
		.wiki-aside {
			width: 100%;
			padding: 0 2rem;
		}
	}
</style>
