<script lang="ts">
	import AclBtn from '$lib/wiki/components/common/btns/aclBtn.svelte';
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';

	const description = '(문서 상태 변경)';
</script>

{#snippet Buttons()}
	<AclBtn />
{/snippet}

<DocHeader {description} Btns={Buttons} />
