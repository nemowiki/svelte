<script lang="ts">
	import DeleteFormBlock from '$lib/wiki/components/blocks/delete/deleteFormBlock.svelte';
	import DeleteHeaderBlock from '$lib/wiki/components/blocks/delete/deleteHeaderBlock.svelte';
	import DeleteNoticeBlock from '$lib/wiki/components/blocks/delete/deleteNoticeBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc } = $props();
</script>

<article>
	<DeleteHeaderBlock {doc} />
	{#if doc.permissions.canDelete}
		<DeleteNoticeBlock />
		<DeleteFormBlock />
	{:else}
		<p class="no-permission">문서를 삭제할 권한이 없습니다.</p>
	{/if}
</article>
