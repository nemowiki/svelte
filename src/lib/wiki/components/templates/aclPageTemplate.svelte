<script lang="ts">
	import AclFormBlock from '$lib/wiki/components/blocks/acl/aclFormBlock.svelte';
	import AclHeaderBlock from '$lib/wiki/components/blocks/acl/aclHeaderBlock.svelte';
	import AclListBlock from '$lib/wiki/components/blocks/acl/aclListBlock.svelte';
	import type { AclDetails, Doc } from '@nemowiki/core/types';

	let { doc, aclDetails }: { doc: Doc | null; aclDetails: AclDetails } = $props();
</script>

<article>
	{#if doc}
		<AclHeaderBlock {doc} />
	{/if}
	<section>
		<AclListBlock {aclDetails} />
	</section>
	{#if doc}
		<hr class="section-divider" />
		<section>
			<AclFormBlock {doc} />
		</section>
	{/if}
</article>
