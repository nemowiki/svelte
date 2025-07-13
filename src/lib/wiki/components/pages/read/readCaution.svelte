<script lang="ts">
	import CommonCaution from '$lib/wiki/components/common/commonCaution.svelte';

	let { ok, rev } = $props();
</script>

{#if ok && rev !== -1}
	<CommonCaution>이 문서는 <b>{rev}</b>번째 수정판임에 유의하세요.</CommonCaution>
{/if}
