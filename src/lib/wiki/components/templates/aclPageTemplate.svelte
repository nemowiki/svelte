<script lang="ts">
	import AclFormBlock from '$lib/wiki/components/blocks/acl/aclFormBlock.svelte';
	import AclHeaderBlock from '$lib/wiki/components/blocks/acl/aclHeaderBlock.svelte';
	import AclListBlock from '$lib/wiki/components/blocks/acl/aclListBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc | null } = $props();
</script>

<article>
	<AclHeaderBlock />
	{#if doc}
		<section>
			<AclListBlock {doc} />
		</section>
		<section>
			<AclFormBlock {doc} />
		</section>
	{/if}
</article>
