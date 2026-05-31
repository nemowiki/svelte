<script lang="ts">
	import type { Snippet } from 'svelte';
	import HeaderModule from '$lib/wiki/components/layout/headerModule.svelte';
	import FooterModule from '$lib/wiki/components/layout/footerModule.svelte';
	import ProfileModule from '$lib/wiki/components/layout/profileModule.svelte';
	import RecentModule from '$lib/wiki/components/layout/recentModule.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<HeaderModule />

<div class="layout">
	<main class="module">
		{@render children()}
	</main>

	<aside class="side">
		<ProfileModule />
		<RecentModule />
	</aside>
</div>

<FooterModule />
