<script lang="ts">
	import RenameHeader from '$lib/wiki/components/pages/rename/renameHeader.svelte';
	import RenameForm from '$lib/wiki/components/pages/rename/renameForm.svelte';
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';
</script>

<article>
	<RenameHeader />
	<CommonWarn>변경 시 30일 동안 재변경이 불가합니다.</CommonWarn>
	<RenameForm />
</article>
