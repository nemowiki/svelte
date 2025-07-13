<script lang="ts">
	import RenameHeader from '$lib/wiki/components/pages/rename/renameHeader.svelte';
	import RenameForm from '$lib/wiki/components/pages/rename/renameForm.svelte';
	import CommonCaution from '$lib/wiki/components/common/commonCaution.svelte';

	let { data } = $props();
</script>

<article>
	<RenameHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<CommonCaution>변경 시 30일 동안 재변경이 불가합니다.</CommonCaution>
		<RenameForm />
	{/if}
</article>
