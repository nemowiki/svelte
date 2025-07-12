<script lang="ts">
	import DocHeader from '$lib/components/common/docHeader.svelte';
	import AuthorityBtn from '$lib/components/common/btns/authorityBtn.svelte';

	const description = '(문서 상태 변경)';
</script>

{#snippet Btns()}
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
