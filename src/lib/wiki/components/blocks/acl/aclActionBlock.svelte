<script lang="ts">
	import { docActions, translatedDocActions } from '$lib/wiki/utils/general.js';
	import type { AclEntry, DocAction } from '@nemowiki/core/types';

	let { docAction, acl }: { docAction: DocAction; acl: AclEntry[] } = $props();
</script>

<div class="action-div">
	<div>
		<span class="action-span">[{translatedDocActions[docActions.indexOf(docAction)]}]</span>
		<span>
			{#if acl.some((entry) => entry.action === docAction)}
				{acl
					.filter((entry) => entry.action === docAction)
					.map((entry) => `${entry.origin}:${entry.type}:${entry.id}`)
					.join(', ')}
			{:else}
				none
			{/if}
		</span>
	</div>
</div>

<style>
	.action-span {
		font-weight: 700;
		color: var(--color-primary-1);
	}
	.action-div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.4rem 0;
		border-bottom: 0.1rem solid var(--color-gray-2);
		font-size: var(--font-sm);
		&:last-of-type {
			border-bottom: none;
		}
	}
	.action-div span:last-child {
		color: var(--color-sub);
		word-break: break-all;
		text-align: right;
	}
</style>
