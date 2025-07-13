<script lang="ts">
	import DeleteHeader from '$lib/wiki/components/pages/delete/deleteHeader.svelte';
	import DeleteForm from '$lib/wiki/components/pages/delete/deleteForm.svelte';
	import CommonCaution from '$lib/wiki/components/common/commonCaution.svelte';

	let { data } = $props();
</script>

<article>
	<DeleteHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<CommonCaution>파일 문서 삭제 시, 파일도 함께 삭제됩니다.</CommonCaution>
		<DeleteForm />
	{/if}
</article>
