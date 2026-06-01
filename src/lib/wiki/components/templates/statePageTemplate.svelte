<script lang="ts">
	import StateFormBlock from '$lib/wiki/components/blocks/state/stateFormBlock.svelte';
	import StateHeaderBlock from '$lib/wiki/components/blocks/state/stateHeaderBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc } = $props();
</script>

<article>
	<StateHeaderBlock {doc} />
	{#if doc.permissions.canToggle}
		<StateFormBlock {doc} />
	{:else}
		<p class="no-permission">문서 상태를 변경할 권한이 없습니다.</p>
	{/if}
</article>
