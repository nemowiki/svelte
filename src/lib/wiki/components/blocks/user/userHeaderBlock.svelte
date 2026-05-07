<script lang="ts">
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';
	import RegroupBtn from '$lib/wiki/components/common/btns/regroupBtn.svelte';
	import RenameBtn from '$lib/wiki/components/common/btns/renameBtn.svelte';
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';

	const description = '(사용자 정보)';
</script>

{#snippet Buttons()}
	<RenameBtn />
	<RegroupBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} Btns={Buttons} />
