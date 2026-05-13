<script lang="ts">
	import AclBtn from '$lib/wiki/components/common/btns/aclBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	const description = '(문서 이동)';
</script>

{#snippet Buttons()}
	<ReadBtn />
	<WriteBtn />
	<AclBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
