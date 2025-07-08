<script lang="ts">
	import CommonHeader from '$lib/components/common/commonHeader.svelte';
	import RenameBtn from '$lib/components/common/btns/renameBtn.svelte';
	import RegroupBtn from '$lib/components/common/btns/regroupBtn.svelte';
	import PenaltyBtn from '$lib/components/common/btns/penaltyBtn.svelte';
	import { page } from '$app/state';

	const fullTitle = `사용자:${page.params.userName}`;
	const description = '(사용자 정보)';
</script>

{#snippet Btns()}
	<RenameBtn {fullTitle} />
	<RegroupBtn {fullTitle} />
	<PenaltyBtn {fullTitle} />
{/snippet}

<CommonHeader title={fullTitle} {description} {Btns} />
