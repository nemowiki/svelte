<script lang="ts">
	import { page } from '$app/state';
	import { Groups } from '@nemowiki/core/types';
	import CommonBtn from '../commonBtn.svelte';

	const userGroup = $derived(page.data.user.group);
</script>

{#if [Groups.Dev, Groups.Manager].includes(userGroup)}
	<CommonBtn btnName="그룹 변경" pageName="regroup" />
{/if}
