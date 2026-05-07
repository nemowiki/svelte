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
		color: black;
	}
	a:hover {
		text-decoration: underline;
		text-decoration-thickness: 0.12rem;
		text-underline-offset: 0.4rem;
	}
</style>
