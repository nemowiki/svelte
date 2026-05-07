<script lang="ts">
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';
	import RegroupBtn from '$lib/wiki/components/common/btns/regroupBtn.svelte';
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';

	const description = '(이름 변경)';
</script>

{#snippet Buttons()}
	<RegroupBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} Btns={Buttons} />
