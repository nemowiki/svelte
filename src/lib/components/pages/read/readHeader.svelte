<script lang="ts">
	import type { Info } from '@nemowiki/core/types';
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import HistoryBtn from '$lib/components/common/btns/historyBtn.svelte';
	import BacklinkBtn from '$lib/components/common/btns/backlinkBtn.svelte';
	import AuthorityBtn from '$lib/components/common/btns/authorityBtn.svelte';

	let { info }: { info: Info | null } = $props();

	const description = info === null ? '0번째 수정판' : info.revision + '번째 수정판';
</script>

{#snippet Btns()}
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
