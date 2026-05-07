<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
	import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
	import { DocPrefixes } from '@nemowiki/core/types';
	import { encodeFullTitle } from '@nemowiki/core/client';
</script>

<header class="container">
	<h1><a href="/r/{encodeFullTitle(DocPrefixes.Wiki + ':대문')}"><span>WIKI</span></a></h1>
	<EllipsisVertical size="1.5rem" style="margin: 0 1rem" />
	<SearchModule />
	<EllipsisVertical size="1.5rem" style="margin: 0 1rem" />
	<UploadModule />
</header>

<style lang="scss">
	@use '../../style/layout/headerModule.scss';
</style>
