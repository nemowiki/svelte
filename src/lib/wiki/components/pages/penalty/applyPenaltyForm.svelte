<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet PenaltyTypeSelect()}
	<select class="penalty-type-select" name="penalty-type">
		<option value="warn">경고</option>
		<option value="block">차단</option>
	</select>
{/snippet}

{#snippet DurationInput()}
	<input
		class="duration-input"
		type="number"
		placeholder="기간 (단위: 분)"
		name="duration"
		autocomplete="off"
	/>
{/snippet}

{#snippet ReasonInput()}
	<input
		class="reason-input"
		placeholder="제재 사유를 입력하세요."
		name="reason"
		autocomplete="off"
	/>
{/snippet}

<h3>제재 적용</h3>
<CommonForm formName="apply-penalty-form" actionName="apply">
	<div class="apply-penalty-form-div container">
		{@render PenaltyTypeSelect()}
		{@render DurationInput()}
		{@render ReasonInput()}
		<button form="apply-penalty-form" type="submit">적용</button>
	</div>
</CommonForm>

<style lang="scss">
	@use '../../../style/pages/penalty/applyPenaltyForm.scss';
</style>
