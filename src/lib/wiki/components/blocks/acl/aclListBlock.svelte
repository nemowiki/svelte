<script lang="ts">
	import { docActions } from '$lib/wiki/utils/general.js';
	import type { AclDetails } from '@nemowiki/core/types';
	import AclActionBlock from './aclActionBlock.svelte';

	let { aclDetails }: { aclDetails: AclDetails } = $props();
</script>

{#each docActions as docAction (docAction)}
	<AclActionBlock {docAction} acl={aclDetails.effective} />
{/each}
