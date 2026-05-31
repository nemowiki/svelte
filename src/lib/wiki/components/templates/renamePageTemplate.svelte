<script lang="ts">
	import RenameFormBlock from '$lib/wiki/components/blocks/rename/renameFormBlock.svelte';
	import RenameHeaderBlock from '$lib/wiki/components/blocks/rename/renameHeaderBlock.svelte';
	import RenameNoticeBlock from '$lib/wiki/components/blocks/rename/renameNoticeBlock.svelte';

	let {
		canRegroup,
		canPenalty
	}: {
		canRegroup: boolean;
		canPenalty: boolean;
	} = $props();
</script>

<article>
	<RenameHeaderBlock {canRegroup} {canPenalty} />
	<RenameNoticeBlock />
	<RenameFormBlock />
</article>
