<script lang="ts">
	import PenaltyHeader from '$lib/wiki/components/pages/penalty/penaltyHeader.svelte';
	import UserPenalty from '$lib/wiki/components/pages/user/userPenalty.svelte';
	import type { Penalty } from '@nemowiki/core/types';
	import ApplyPenaltyForm from '$lib/wiki/components/pages/penalty/applyPenaltyForm.svelte';
	import RemovePenaltyForm from '$lib/wiki/components/pages/penalty/removePenaltyForm.svelte';

	let { data } = $props();

	const penalties = $derived<Penalty[]>(JSON.parse(data?.penalties || '[]'));
</script>

<article>
	<PenaltyHeader />
	<UserPenalty {penalties} />
	<RemovePenaltyForm {penalties} />
	<ApplyPenaltyForm />
</article>
