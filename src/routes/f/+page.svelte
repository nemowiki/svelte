<script lang="ts">
	import FileForm from '$lib/wiki/components/pages/file/fileForm.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import CommonHeader from '$lib/wiki/components/common/commonHeader.svelte';

	let { data } = $props();

	onMount(() => {
		goto(window.location.pathname + window.location.search, {
			replaceState: false
		});
	});
</script>

<article>
	<CommonHeader>파일 업로드</CommonHeader>
	<FileForm initial_markup={data?.boilerplate} />
</article>
