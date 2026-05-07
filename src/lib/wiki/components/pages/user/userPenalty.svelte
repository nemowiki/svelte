<script lang="ts">
	import type { Penalty, PenaltyType } from '@nemowiki/core/types';
	import { parseDateTime } from '$lib/wiki/utils/general.js';

	let { penalties } = $props();


</script>

{#snippet PenaltyTypeSpan(type: PenaltyType)}
	{#if type === 'block'}
		<span style="color: red"><b>[차단]</b></span>
	{:else if type === 'warn'}
		<span style="color: darkorange"><b>[경고]</b></span>
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

{#snippet PenaltyExpirySpan(expiresAt: Date | null)}
	{#if expiresAt === null}
		<span style="color: red"><b>(무기한)</b></span>
	{:else}
		{parseDateTime(expiresAt)} 까지
	{/if}
{/snippet}

{#snippet PenaltyDate(penalty: Penalty)}
	<span>
		{@render PenaltyExpirySpan(penalty.expiresAt)}
	</span>
{/snippet}

<div>
	<h3>경고 및 차단</h3>
	{#if penalties.length === 0}
		<p>받은 경고 및 차단 사항이 없습니다.</p>
	{:else}
		{#each penalties as penalty, idx (penalty._id)}
			<div class="penalty-div">
				{@render PenaltyHeader(penalty, idx)}
				{@render PenaltyDate(penalty)}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	@use '../../../style/pages/user/userPenalty.scss';
</style>
