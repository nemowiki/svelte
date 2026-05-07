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
		padding: 1rem;
		border: 0.1rem black solid;
	}
	.added {
		background-color: rgba(0, 255, 0, 0.2);
		color: darkgreen;
	}
	.removed {
		text-decoration-line: line-through;
		background-color: rgba(255, 0, 0, 0.2);
		color: maroon;
	}
</style>
