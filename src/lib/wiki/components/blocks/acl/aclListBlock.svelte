<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import { docActions } from '$lib/wiki/utils/general.js';
	import AclActionBlock from './aclActionBlock.svelte';

	let { doc }: { doc: Doc } = $props();
</script>

{#each docActions as docAction (docAction)}
	<AclActionBlock {docAction} {doc} />
{/each}
