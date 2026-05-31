<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { page } from '$app/state';
	import type { Component } from 'svelte';

	let {
		pageName,
		btnName,
		Icon
	}: { pageName: string; btnName: string; Icon?: Component<{ size?: string | number }> } = $props();

	let slug = $derived(page.params.fullTitle || page.params.userName || page.params.query);

	function gotoPage(): void {
		goto(`/${pageName}/${encodeFullTitle(slug)}`);
	}
</script>

<button class="icon-btn" onclick={gotoPage}>
	{#if Icon}
		<Icon size="0.9rem" />
	{/if}
	{btnName}
</button>
