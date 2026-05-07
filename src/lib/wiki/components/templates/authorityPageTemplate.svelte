<script lang="ts">
	import AuthorityFormBlock from '$lib/wiki/components/blocks/authority/authorityFormBlock.svelte';
	import AuthorityHeaderBlock from '$lib/wiki/components/blocks/authority/authorityHeaderBlock.svelte';
	import AuthorityListBlock from '$lib/wiki/components/blocks/authority/authorityListBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc | null } = $props();
</script>

<article>
	<AuthorityHeaderBlock />
	{#if doc}
		<section>
			<AuthorityListBlock {doc} />
		</section>
		<section>
			<AuthorityFormBlock {doc} />
		</section>
	{/if}
</article>
