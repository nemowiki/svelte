<script lang="ts">
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';
	import CommonInfo from '$lib/wiki/components/common/commonInfo.svelte';

	let { ok, rev, from } = $props();
</script>

{#if ok && rev !== -1}
	<CommonWarn>이 문서는 <b>{rev}</b>번째 수정판임에 유의하세요.</CommonWarn>
{/if}

{#if ok && from}
	<CommonInfo><a href="/r/{from}?redirect=no">{from}</a>에서 넘어옴.</CommonInfo>
{/if}
