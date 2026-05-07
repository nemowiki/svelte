<script lang="ts">
	import { page } from '$app/state';
	import CommonHeader from '$lib/wiki/components/common/commonHeader.svelte';

	const query = $derived<string>(page.params.query);
</script>

<CommonHeader>{`검색: ${query}`}</CommonHeader>
