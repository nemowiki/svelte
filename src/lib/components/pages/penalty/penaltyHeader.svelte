<script lang="ts">
	import UserHeader from '$lib/components/common/userHeader.svelte';
	import UserBtn from '$lib/components/common/btns/userBtn.svelte';

	const description = '(경고 및 차단)';
</script>

{#snippet Btns()}
	<UserBtn />
{/snippet}

<UserHeader {description} {Btns} />
