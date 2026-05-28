<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
	import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
	import { encodeFullTitle } from '@nemowiki/core';
	import { DocPrefixes } from '@nemowiki/core/types';
</script>

<header class="container">
	<h1><a href="/r/{encodeFullTitle(DocPrefixes.Wiki + ':대문')}"><span>WIKI</span></a></h1>
	<EllipsisVertical size="1.5rem" style="margin: 0 1rem" />
	<SearchModule />
	<EllipsisVertical size="1.5rem" style="margin: 0 1rem" />
	<UploadModule />
</header>

<style>
	header {
		position: relative;
		padding: 0.5rem;
		right: 0rem;
		width: stretch;
		background-color: white;
		top: 0rem;
		border-bottom: 0.15rem solid black;
		margin-bottom: 1rem;
	}
	header a {
		font-size: 1.6rem;
		margin-top: 0.4rem;
		margin-left: 0.6rem;
	}
	header a:hover {
		text-decoration: none;
	}
</style>
