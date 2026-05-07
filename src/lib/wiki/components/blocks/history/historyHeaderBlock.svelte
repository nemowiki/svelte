<script lang="ts">
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	const description = '(역사 목록)';
</script>

{#snippet Buttons()}
	<ReadBtn />
	<WriteBtn />
	<BacklinkBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
