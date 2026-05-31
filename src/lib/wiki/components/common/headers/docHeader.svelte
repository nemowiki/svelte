<script lang="ts">
	import { page } from '$app/state';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { Snippet } from 'svelte';
	import CommonHeader from '../commonHeader.svelte';

	let {
		Btns,
		description
	}: {
		Btns: Snippet;
		description?: string;
	} = $props();

	const fullTitle = $derived(page.params.fullTitle);
</script>

<CommonHeader {description} {Btns}>
	<a href="/r/{encodeFullTitle(fullTitle)}">{fullTitle}</a>
</CommonHeader>

<style>
	a {
		color: var(--color-text);
	}
	a:hover {
		color: var(--color-primary-1);
		text-decoration: none;
	}
</style>
