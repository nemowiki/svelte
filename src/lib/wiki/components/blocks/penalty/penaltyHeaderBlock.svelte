<script lang="ts">
	import RenameBtn from '$lib/wiki/components/common/btns/renameBtn.svelte';
	import UserBtn from '$lib/wiki/components/common/btns/userBtn.svelte';
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';

	const description = '(경고 및 차단)';
</script>

{#snippet Buttons()}
	<UserBtn />
	<RenameBtn />
{/snippet}

<UserHeader {description} Btns={Buttons} />
