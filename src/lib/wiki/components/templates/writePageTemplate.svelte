<script lang="ts">
	import WriteEditorBlock from '$lib/wiki/components/blocks/write/writeEditorBlock.svelte';
	import WriteHeaderBlock from '$lib/wiki/components/blocks/write/writeHeaderBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc } = $props();
</script>

<article>
	<WriteHeaderBlock {doc} />
	{#if doc.permissions.canEdit}
		<WriteEditorBlock {doc} />
	{:else}
		<p class="no-permission">편집 권한이 없습니다.</p>
	{/if}
</article>
