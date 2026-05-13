<script lang="ts">
	import type { Snippet } from 'svelte';
	import HeaderModule from '$lib/wiki/components/layout/headerModule.svelte';
	import FooterModule from '$lib/wiki/components/layout/footerModule.svelte';
	import ProfileModule from '$lib/wiki/components/layout/profileModule.svelte';
	import RecentModule from '$lib/wiki/components/layout/recentModule.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<HeaderModule />

<div class="layout-container">
	<main class="content-area module">
		{@render children()}
	</main>

	<aside class="sidebar-area">
		<ProfileModule />
		<RecentModule />
	</aside>
</div>

<FooterModule />

<style>
	.layout-container {
		display: flex;
		justify-content: center;
		flex: 1;
		gap: 1rem;
	}

	.content-area {
		padding: 1rem 2rem;
		max-width: 50rem;
		width: 100%;
	}

	.sidebar-area {
		width: 250px;
	}

	@media (max-width: 768px) {
		.layout-container {
			flex-direction: column;
		}
		.sidebar-area {
			width: 100%;
		}
	}
</style>
