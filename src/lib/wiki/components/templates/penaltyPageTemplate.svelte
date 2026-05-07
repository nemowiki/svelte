<script lang="ts">
	import PenaltyListBlock from '$lib/wiki/components/blocks/user/penaltyListBlock.svelte';
	import PenaltyApplyFormBlock from '$lib/wiki/components/blocks/penalty/penaltyApplyFormBlock.svelte';
	import PenaltyHeaderBlock from '$lib/wiki/components/blocks/penalty/penaltyHeaderBlock.svelte';
	import PenaltyRemoveFormBlock from '$lib/wiki/components/blocks/penalty/penaltyRemoveFormBlock.svelte';
	import type { Penalty } from '@nemowiki/core/types';

	let { penalties }: { penalties: Penalty[] } = $props();
</script>

<article>
	<PenaltyHeaderBlock />
	<PenaltyListBlock {penalties} />
	<PenaltyRemoveFormBlock {penalties} />
	<PenaltyApplyFormBlock />
</article>
