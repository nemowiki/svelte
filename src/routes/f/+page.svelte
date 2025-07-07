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

<CommonHeader description="파일 업로드" />

<article id="main-article">
	<FileForm initial_markup={data.boilerplate} />
</article>
