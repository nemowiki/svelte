<script lang="ts">
	import postReq from '$lib/utils/postReq.js';
	import { page } from '$app/state';

	let { fullTitle }: { fullTitle: string } = $props();

	let queriedUserName = $derived<string>(fullTitle.split(':').slice(1).join(':'));
	let userGroup = $derived(JSON.parse(page.data.user).group);

	async function warnUser(): Promise<void> {
		const comment = prompt('경고 사유를 입력해 주세요.');
		if (!comment) return;

		const duration = prompt('경고 기간을 입력해 주세요. (단위: 분)');
		if (!duration) return;

		const res = await postReq('/api/penalty/warn', {
			userName: queriedUserName,
			duration,
			comment
		});
		if (res.ok) alert('정상적으로 처리되었습니다.');
		else alert(res.reason);
	}

	async function blockUser(): Promise<void> {
		const comment = prompt('차단 사유를 입력해 주세요.');
		if (!comment) return;

		const duration = prompt('차단 기간을 입력해 주세요. (단위: 분)');
		if (!duration) return;

		const res = await postReq('/api/penalty/block', {
			userName: queriedUserName,
			duration,
			comment
		});
		if (res.ok) alert('정상적으로 처리되었습니다.');
		else alert(res.reason);
	}
</script>

{#if ['dev', 'manager'].includes(userGroup)}
	<button onclick={warnUser}>경고</button>
	<button onclick={blockUser}>차단</button>
{/if}
