<script lang="ts">
	import UserHeader from '$lib/components/common/userHeader.svelte';
	import RenameBtn from '$lib/components/common/btns/renameBtn.svelte';
	import PenaltyBtn from '$lib/components/common/btns/penaltyBtn.svelte';

	const description = '(그룹 변경)';
</script>

{#snippet Btns()}
	<RenameBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} {Btns} />
