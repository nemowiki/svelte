<script lang="ts">
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';

	let { rev }: { rev: number } = $props();
</script>

{#if rev !== -1}
	<CommonWarn>이 문서는 <b>{rev}</b>번째 수정판이니 주의하세요.</CommonWarn>
{/if}
