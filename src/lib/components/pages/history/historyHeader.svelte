<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import BacklinkBtn from '$lib/components/common/btns/backlinkBtn.svelte';
	import AuthorityBtn from '$lib/components/common/btns/authorityBtn.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';

	let { fullTitle }: { fullTitle: string } = $props();

	const description = '(역사 목록)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<BacklinkBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {fullTitle} {description} {Btns} />
