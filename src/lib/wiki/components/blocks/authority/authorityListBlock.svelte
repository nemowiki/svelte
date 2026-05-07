<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import { docActions } from '$lib/wiki/utils/general.js';
	import AuthorityActionBlock from './authorityActionBlock.svelte';

	let { doc }: { doc: Doc } = $props();
</script>

{#each docActions as docAction (docAction)}
	<AuthorityActionBlock {docAction} {doc} />
{/each}
