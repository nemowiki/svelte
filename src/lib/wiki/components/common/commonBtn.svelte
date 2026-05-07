<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { page } from '$app/state';

	let { pageName, btnName }: { pageName: string; btnName: string } = $props();

	let slug = $derived(page.params.fullTitle || page.params.userName || page.params.query);

	function gotoPage(): void {
		goto(`/${pageName}/${encodeFullTitle(slug)}`);
	}
</script>

<button class="{pageName}-btn" onclick={gotoPage}>{btnName}</button>

<style>
	button {
		padding: 0.25rem 0.75rem;
		border: solid gray 0.05rem;
		background-color: white;
		font-size: 1rem;
		font-weight: bold;
	}
	button:hover {
		cursor: pointer;
		background-color: var(--color-gray-2);
	}
</style>
