<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import RenameBtn from '$lib/components/common/btns/renameBtn.svelte';
	import RegroupBtn from '$lib/components/common/btns/regroupBtn.svelte';
	import PenaltyBtn from '$lib/components/common/btns/penaltyBtn.svelte';
	import { page } from '$app/state';

	const fullTitle = `사용자:${page.params.title}`;
	const description = '(사용자 정보)';
</script>

{#snippet Btns()}
	<RenameBtn {fullTitle} />
	<RegroupBtn {fullTitle} />
	<PenaltyBtn {fullTitle} />
{/snippet}

<DocHeader {fullTitle} {description} {Btns} />
