<script lang="ts">
	import MoveFormBlock from '$lib/wiki/components/blocks/move/moveFormBlock.svelte';
	import MoveHeaderBlock from '$lib/wiki/components/blocks/move/moveHeaderBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc } = $props();
</script>

<article>
	<MoveHeaderBlock {doc} />
	{#if doc.permissions.canMove}
		<MoveFormBlock />
	{:else}
		<p class="no-permission">문서를 이동할 권한이 없습니다.</p>
	{/if}
</article>
