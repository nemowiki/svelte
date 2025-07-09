<script lang="ts">
	import FileForm from '$lib/components/pages/file/fileForm.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import CommonHeader from '$lib/components/common/commonHeader.svelte';

	let { data } = $props();

	onMount(() => {
		goto(window.location.pathname + window.location.search, {
			replaceState: false
		});
	});
</script>

<article>
	<CommonHeader title="파일 업로드" />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<FileForm initial_markup={data?.value?.boilerplate} />
	{/if}
</article>
