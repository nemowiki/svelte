<script lang="ts">
	import type { DocAction, Info } from '@nemowiki/core/types';
	import { docActionArr, translatedDocActionArr } from '$lib/utils/general.js';
	import ChangeAuthorityBtn from './changeAuthorityBtn.svelte';

	let { docAction, info }: { docAction: DocAction; info: Info } = $props();
</script>

<div class="action-div">
	<div>
		<span class="action-span">[{translatedDocActionArr[docActionArr.indexOf(docAction)]}]</span>
		<span>
			{#if info.authority?.[docAction]}
				{info.authority[docAction]}
			{:else}
				none
			{/if}
		</span>
	</div>
	<ChangeAuthorityBtn {docAction} {info} />
</div>
<hr />

<style lang="scss">
	.action-span {
		font-weight: bold;
	}

	.action-div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.5rem;
	}
</style>
