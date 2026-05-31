<script lang="ts">
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';
	import RenameBtn from '$lib/wiki/components/common/btns/renameBtn.svelte';
	import UserBtn from '$lib/wiki/components/common/btns/userBtn.svelte';
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';

	let {
		canRename,
		canPenalty
	}: {
		canRename: boolean;
		canPenalty: boolean;
	} = $props();

	const description = '(그룹 변경)';
</script>

{#snippet Buttons()}
	<UserBtn />
	{#if canRename}
		<RenameBtn />
	{/if}
	{#if canPenalty}
		<PenaltyBtn />
	{/if}
{/snippet}

<UserHeader {description} Btns={Buttons} />
