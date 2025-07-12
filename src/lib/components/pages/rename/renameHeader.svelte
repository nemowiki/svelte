<script lang="ts">
	import UserHeader from '$lib/components/common/userHeader.svelte';
	import RegroupBtn from '$lib/components/common/btns/regroupBtn.svelte';
	import PenaltyBtn from '$lib/components/common/btns/penaltyBtn.svelte';

	const description = '(이름 변경)';
</script>

{#snippet Btns()}
	<RegroupBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} {Btns} />
