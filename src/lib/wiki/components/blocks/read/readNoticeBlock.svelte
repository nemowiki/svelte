<script lang="ts">
	import CommonInfo from '$lib/wiki/components/common/commonInfo.svelte';
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';

	let { from, rev }: { from: string | null; rev: number } = $props();
</script>

{#if from}
	<CommonInfo><a href="/r/{from}?redirect=no">{from}</a>에서 넘어옴</CommonInfo>
{/if}

{#if rev !== -1}
	<CommonWarn>이 문서는 <b>{rev}</b>번째 수정판이니 주의하세요.</CommonWarn>
{/if}
