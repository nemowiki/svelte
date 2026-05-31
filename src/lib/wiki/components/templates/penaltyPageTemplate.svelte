<script lang="ts">
	import PenaltyListBlock from '$lib/wiki/components/blocks/user/penaltyListBlock.svelte';
	import PenaltyApplyFormBlock from '$lib/wiki/components/blocks/penalty/penaltyApplyFormBlock.svelte';
	import PenaltyHeaderBlock from '$lib/wiki/components/blocks/penalty/penaltyHeaderBlock.svelte';
	import PenaltyRemoveFormBlock from '$lib/wiki/components/blocks/penalty/penaltyRemoveFormBlock.svelte';
	import type { Penalty } from '@nemowiki/core/types';

	let {
		canRename,
		canRegroup,
		canManagePenalty,
		canApplyPenalty,
		penalties
	}: {
		canRename: boolean;
		canRegroup: boolean;
		canManagePenalty: boolean;
		canApplyPenalty: boolean;
		penalties: Penalty[];
	} = $props();
</script>

<article>
	<PenaltyHeaderBlock {canRename} {canRegroup} />
	<section>
		<PenaltyListBlock {penalties} />
	</section>
	{#if canManagePenalty && penalties.length > 0}
		<hr class="section-divider" />
		<section>
			<PenaltyRemoveFormBlock {penalties} />
		</section>
	{/if}
	{#if canApplyPenalty}
		<hr class="section-divider" />
		<section>
			<PenaltyApplyFormBlock />
		</section>
	{/if}
</article>
