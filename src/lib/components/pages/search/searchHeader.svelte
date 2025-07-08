<script lang="ts">
	import CommonHeader from '$lib/components/common/commonHeader.svelte';
	import { page } from '$app/state';

	const query = $derived<string>(page.params.query);
</script>

<CommonHeader title={`검색:${query}`} />
