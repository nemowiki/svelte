<script lang="ts">
	import FilePageTemplate from '$lib/wiki/components/templates/filePageTemplate.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		goto(window.location.pathname + window.location.search, { replaceState: false });
	});
</script>

<FilePageTemplate boilerplate={data?.boilerplate || ''} />
