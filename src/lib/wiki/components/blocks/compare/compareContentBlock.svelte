<script lang="ts">
	import type { Change } from '@nemowiki/core/types';

	let { diff }: { diff: Change[] | null } = $props();
</script>

<div class="compare-div">
	{#if diff === null}
		<p>비교할 문서가 없습니다.</p>
	{:else}
		<p>
			{#each diff as part, i (i)}
				{#if part.added}
					<span class="added">{part.value}</span>
				{:else if part.removed}
					<span class="removed">{part.value}</span>
				{:else}
					{part.value}
				{/if}
			{/each}
		</p>
	{/if}
</div>

<style>
	.compare-div p {
		white-space: pre-wrap;
		padding: 1.2rem;
		border: 0.1rem solid var(--color-line);
		border-radius: 0.8rem;
		background-color: var(--color-panel);
		line-height: 1.8;
		font-size: var(--font-sm);
		word-break: break-all;
	}
	.added {
		background-color: var(--color-success-back);
		color: var(--color-success);
		border-radius: 0.2rem;
		padding: 0 0.2rem;
	}
	.removed {
		text-decoration: line-through;
		background-color: var(--color-error-back);
		color: var(--color-error);
		border-radius: 0.2rem;
		padding: 0 0.2rem;
	}
</style>
