<script lang="ts">
	import { page } from '$app/state';
	import postReq from '$lib/utils/postReq.js';
	import type { MongoDocId } from '@nemowiki/core/types';

	let { penaltyId }: { penaltyId: MongoDocId } = $props();
	let userGroup = $derived(JSON.parse(page.data.user).group);

	async function removePenalty() {
		const comment = prompt('취소 사유를 입력해주세요.');
		if (!comment) return;

		const res = await postReq('/api/penalty/remove', {
			penaltyId,
			comment
		});

		if (res.ok) alert('정상적으로 처리되었습니다.');
		else alert(res.reason);
	}
</script>

{#if ['manager', 'dev'].includes(userGroup)}
	<button class="remove-penalty-btn" onclick={removePenalty}> 취소</button>
{/if}

<style lang="scss">
	.remove-penalty-btn {
		padding: 0.1rem 0.5rem;
		font-size: 0.7rem;
	}
</style>
