<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { page } from '$app/state';

	let { pageName, btnName }: { pageName: string; btnName: string } = $props();

	let fullTitle = $derived(page.params.fullTitle);

	function gotoPage(): void {
		goto(`/${pageName}/${encodeFullTitle(fullTitle)}`);
	}
</script>

<button class="{pageName}-btn" onclick={gotoPage}>{btnName}</button>

<style lang="scss">
	@use '../../../style/btns.scss';
</style>
