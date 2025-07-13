<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
	import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
	import { page } from '$app/state';
</script>

<header class="container">
	<h1><a href="/r/위키:대문"><span>WIKI</span></a></h1>
	{#if page.data.user}
		<EllipsisVertical size="1.5rem" style="margin: 0 1rem" />
		<UploadModule />
		<EllipsisVertical size="1.5rem" style="margin: 0 1rem" />
		<SearchModule />
	{/if}
</header>

<style lang="scss">
	header {
		position: relative;
		padding: 0.5rem;
		right: 0rem;
		width: stretch;
		background-color: white;
		top: 0rem;
		border-bottom: 0.15rem solid black;

		a {
			font-size: 1.6rem;
			margin-top: 0.4rem;
			margin-left: 0.6rem;
		}

		a:hover {
			text-decoration: none;
		}
	}
</style>
