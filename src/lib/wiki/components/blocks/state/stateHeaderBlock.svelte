<script lang="ts">
	import AclBtn from '$lib/wiki/components/common/btns/aclBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let {
		doc
	}: {
		doc: Doc | null;
	} = $props();

	const description = '(문서 상태 변경)';
</script>

{#snippet Buttons()}
	{#if doc?.permissions.canHide || doc?.permissions.canShow}
		<AclBtn />
	{/if}
{/snippet}

<DocHeader {description} Btns={Buttons} />
