<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import type { Penalty } from '@nemowiki/core/types';

	let { penalties }: { penalties: Penalty[] } = $props();
</script>

{#snippet PenaltyIdSelect()}
	<select class="penalty-id-select" name="penalty-id">
		{#each penalties as penalty, idx (idx)}
			<option value={penalty._id}>{idx + 1}</option>
		{/each}
	</select>
{/snippet}

{#snippet ReasonInput()}
	<input
		class="reason-input"
		placeholder="취소하는 이유를 입력하세요."
		name="reason"
		autocomplete="off"
	/>
{/snippet}

<h3>제재 취소</h3>
{#if penalties.length === 0}
	<p>취소할 경고 및 차단 사항이 없습니다.</p>
{:else}
	<CommonForm formName="remove-penalty-form" actionName="remove">
		<div class="remove-penalty-form-div container">
			{@render PenaltyIdSelect()}
			{@render ReasonInput()}
			<button form="remove-penalty-form" type="submit">확인</button>
		</div>
	</CommonForm>
{/if}

<style lang="scss">
	@use '../../../style/pages/penalty/removePenaltyForm.scss';
</style>
