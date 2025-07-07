<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import postReq from '$lib/utils/postReq.js';
	import { canMove, encodeFullTitle } from '@nemowiki/core/client';
	import type { Info } from '@nemowiki/core/types';

	let { info }: { info: Info | null } = $props();

	async function moveDoc(): Promise<void> {
		if (!info) return;

		const newFullTitle = prompt('새로운 문서 제목을 입력해 주세요.');
		if (!newFullTitle) return;

		const res_move = canMove(info, newFullTitle, JSON.parse(page.data.user).group);

		if (!res_move.ok) {
			alert(res_move.reason);
			return;
		}

		const comment = prompt('문서를 이동하는 이유를 입력해 주세요.');

		const res = await postReq('/api/move', {
			fullTitle: info.fullTitle,
			newFullTitle,
			comment
		});

		if (res.ok) {
			alert('이동이 완료되었습니다.');
			goto(`/r/${encodeFullTitle(newFullTitle)}`);
		} else {
			alert(res.reason);
		}
	}
</script>

{#if info && info.type !== 'category' && (info.state === 'normal' || info.state === 'deleted')}
	<button onclick={moveDoc}>이동</button>
{/if}
