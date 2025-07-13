<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import type { PenaltyDoc } from '@nemowiki/core/types';

	let { penaltyArr }: { penaltyArr: PenaltyDoc[] } = $props();
</script>

{#snippet PenaltyIdSelect()}
	<select id="penalty-id-select" name="penalty-id">
		{#each penaltyArr as penalty, idx (idx)}
			<option value={penalty._id}>{idx + 1}</option>
		{/each}
	</select>
{/snippet}

{#snippet ReasonInput()}
	<input
		id="reason-input"
		placeholder="취소하는 이유를 입력하세요."
		name="reason"
		autocomplete="off"
	/>
{/snippet}

<h3>제재 취소</h3>
{#if penaltyArr.length === 0}
	<p>취소할 경고 및 차단 사항이 없습니다.</p>
{:else}
	<CommonForm formName="remove-penalty-form" actionName="remove">
		<div id="remove-penalty-form-div" class="container">
			{@render PenaltyIdSelect()}
			{@render ReasonInput()}
			<button form="remove-penalty-form" type="submit">확인</button>
		</div>
	</CommonForm>
{/if}

<style lang="scss">
	h3 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}

	#remove-penalty-form-div {
		justify-content: space-between;

		#penalty-id-select {
			width: 10%;
			height: stretch;
			padding: 0.25rem 0.5rem;
			font-weight: bold;
		}

		#reason-input {
			width: 80%;
			height: stretch;
			padding: 0.25rem 0.5rem;
		}
	}
</style>
