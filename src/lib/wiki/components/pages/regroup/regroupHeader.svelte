<script lang="ts">
	import UserHeader from '$lib/wiki/components/common/userHeader.svelte';
	import RenameBtn from '$lib/wiki/components/common/btns/renameBtn.svelte';
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';

	const description = '(그룹 변경)';
</script>

{#snippet Btns()}
	<RenameBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} {Btns} />
