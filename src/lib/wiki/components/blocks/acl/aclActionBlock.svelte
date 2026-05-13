<script lang="ts">
	import { docActions, translatedDocActions } from '$lib/wiki/utils/general.js';
	import type { Doc, DocAction } from '@nemowiki/core/types';

	let { docAction, doc }: { docAction: DocAction; doc: Doc } = $props();
</script>

<div class="action-div">
	<div>
		<span class="action-span">[{translatedDocActions[docActions.indexOf(docAction)]}]</span>
		<span>
			{#if doc.acl.some((entry) => entry.action === docAction)}
				{doc.acl
					.filter((entry) => entry.action === docAction)
					.map((entry) => `${entry.origin}:${entry.type}:${entry.id}`)
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
