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

	const fullTitle = $derived('사용자:' + page.params.userName);
</script>

<CommonHeader {description} {Btns}>
	<a href="/u/{encodeFullTitle(page.params.userName)}">{fullTitle}</a>
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
