<script lang="ts">
	import RegroupBtn from '$lib/wiki/components/common/btns/regroupBtn.svelte';
	import RenameBtn from '$lib/wiki/components/common/btns/renameBtn.svelte';
	import UserBtn from '$lib/wiki/components/common/btns/userBtn.svelte';
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';

	let {
		canRename,
		canRegroup
	}: {
		canRename: boolean;
		canRegroup: boolean;
	} = $props();

	const description = '(경고 및 차단)';
</script>

{#snippet Buttons()}
	<UserBtn />
	{#if canRename}
		<RenameBtn />
	{/if}
	{#if canRegroup}
		<RegroupBtn />
	{/if}
{/snippet}

<UserHeader {description} Btns={Buttons} />
