<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet PenaltyTypeSelect()}
	<select id="penalty-type-select" name="penalty-type">
		<option value="warn">경고</option>
		<option value="block">차단</option>
	</select>
{/snippet}

{#snippet DurationInput()}
	<input id="duration-input" placeholder="제재 기간을 입력하세요. (단위: 분)" name="duration" />
{/snippet}

{#snippet ReasonInput()}
	<input id="reason-input" placeholder="제재 사유를 입력하세요." name="reason" />
{/snippet}

<h3>제재 적용</h3>
<CommonForm btnName="적용" actionName="apply">
	{@render PenaltyTypeSelect()}
	{@render DurationInput()}
	{@render ReasonInput()}
</CommonForm>

<style lang="scss">
	h3 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
</style>
