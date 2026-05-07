<script lang="ts">
	import '$lib/wiki/style/main.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { afterNavigate } from '$app/navigation';
	import { addPopupListener } from '$lib/wiki/utils/footnotePopup.js';
	import { onMount } from 'svelte';
	import MainLayoutTemplate from '$lib/wiki/components/templates/mainLayoutTemplate.svelte';

	injectAnalytics();
	injectSpeedInsights();

	let { children } = $props();

	onMount(() => {
		addPopupListener();
	});

	afterNavigate(() => {
		addPopupListener();
	});
</script>

<MainLayoutTemplate>
	{@render children()}
</MainLayoutTemplate>
