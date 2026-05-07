<script lang="ts">
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	const description = '(문서 상태 변경)';
</script>

{#snippet Buttons()}
	<AuthorityBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
