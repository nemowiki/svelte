<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import ReadBtn from '$lib/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/components/common/btns/writeBtn.svelte';
	import AuthorityBtn from '$lib/components/common/btns/authorityBtn.svelte';

	const description = '(문서 삭제)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
