<script lang="ts">
	import { docActions } from '$lib/wiki/utils/general.js';
	import AuthorityGroupList from './actionModule.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc } = $props();
</script>

{#each docActions as docAction (docAction)}
	<AuthorityGroupList {docAction} {doc} />
{/each}

<style lang="scss">
	@use '../../../style/pages/authority/authorityList.scss';
</style>
