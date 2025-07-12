<script lang="ts">
	import UserHeader from '$lib/components/common/userHeader.svelte';
	import RenameBtn from '$lib/components/common/btns/renameBtn.svelte';
	import RegroupBtn from '$lib/components/common/btns/regroupBtn.svelte';
	import PenaltyBtn from '$lib/components/common/btns/penaltyBtn.svelte';

	const description = '(사용자 정보)';
</script>

{#snippet Btns()}
	<RenameBtn />
	<RegroupBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} {Btns} />
