<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import MainLayoutTemplate from '$lib/wiki/components/templates/mainLayoutTemplate.svelte';
	import '$lib/wiki/style/main.css';
	import { addPopupListener } from '$lib/wiki/utils/footnotePopup.js';
	import { onMount } from 'svelte';

	// injectAnalytics();
	// injectSpeedInsights();

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
