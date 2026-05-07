<script lang="ts">
	import { docActions, translatedDocActions } from '$lib/wiki/utils/general.js';
	import type { AuthorityTarget, Doc, DocAction } from '@nemowiki/core/types';

	let { docAction, doc }: { docAction: DocAction; doc: Doc } = $props();
</script>

<div class="action-div">
	<div>
		<span class="action-span">[{translatedDocActions[docActions.indexOf(docAction)]}]</span>
		<span>
			{#if doc.authority?.[docAction]}
				{(doc.authority[docAction] as AuthorityTarget[])
					?.map((target) =>
						target.type === 'group' ? `[그룹] ${target.id}` : `[유저] ${target.id}`
					)
					.join(', ')}
			{:else}
				none
			{/if}
		</span>
	</div>
</div>
<hr />

<style>
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
