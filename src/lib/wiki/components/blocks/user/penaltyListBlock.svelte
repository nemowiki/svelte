<script lang="ts">
	import { parseDateTime } from '$lib/wiki/utils/general.js';
	import type { Penalty, PenaltyType } from '@nemowiki/core/types';

	let {
		penalties,
		variant = 'list'
	}: {
		penalties: Penalty[];
		variant?: 'list' | 'card';
	} = $props();
</script>

{#snippet PenaltyTypeSpan(type: PenaltyType)}
	{#if type === 'block'}
		<span class="type-block"><b>[차단]</b></span>
	{:else if type === 'warn'}
		<span class="type-warn"><b>[경고]</b></span>
	{:else}
		<span>기타</span>
	{/if}
{/snippet}

{#snippet PenaltyHeader(penalty: Penalty, idx: number)}
	<span>
		<b>{idx + 1}.</b>
		{@render PenaltyTypeSpan(penalty.type)} <i>{penalty.comment}</i>
	</span>
{/snippet}

{#snippet PenaltyExpirySpan(expiresAt: string | null)}
	{#if expiresAt === null}
		<span class="expiry-perm"><b>(무기한)</b></span>
	{:else}
		{parseDateTime(expiresAt)}까지
	{/if}
{/snippet}

<div class:user-penalty-card={variant === 'card'}>
	<h3>경고 및 차단</h3>
	{#if penalties.length === 0}
		<p>받은 경고 및 차단 사항이 없습니다.</p>
	{:else}
		{#each penalties as penalty, idx (penalty._id)}
			<div class="penalty-div">
				{@render PenaltyHeader(penalty, idx)}
				<span>{@render PenaltyExpirySpan(penalty.expiresAt)}</span>
			</div>
		{/each}
	{/if}
</div>

<style>
	.penalty-div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.4rem 0;
		border-bottom: 0.1rem solid var(--color-gray-2);
		font-size: var(--font-sm);
		&:last-child {
			border-bottom: none;
		}
	}
	.type-block,
	.expiry-perm {
		color: var(--color-error);
	}
	.type-warn {
		color: var(--color-warn);
	}
</style>
