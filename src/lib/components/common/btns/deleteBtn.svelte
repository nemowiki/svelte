<script lang="ts">
	import { canDelete, encodeFullTitle } from '@nemowiki/core/client';
	import type { Info } from '@nemowiki/core/types';
	import postReq from '$lib/utils/postReq.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { info }: { info: Info | null } = $props();
	async function deleteDoc(): Promise<void> {
		if (!info) return;

		const res_delete = canDelete(info, JSON.parse(page.data.user).group);

		if (!res_delete.ok) {
			alert(res_delete.reason);
			return;
		}

		const deleteComment = prompt('삭제하는 이유를 간략하게 적어주세요.');

		if (deleteComment === null) return;

		if (!confirm('정말로 삭제하시겠습니까?\n(파일 문서의 경우, 파일도 함께 삭제됩니다.)')) {
			alert('삭제가 취소되었습니다.');
			return;
		}

		const res = await postReq('/api/delete', {
			fullTitle: info.fullTitle,
			comment: deleteComment
		});

		if (res.ok) {
			alert('삭제가 완료되었습니다.');
			goto(`/r/${encodeFullTitle(info.fullTitle)}`);
		} else {
			alert(res.reason);
		}
	}
</script>

{#if info && info.type !== 'category' && info.state === 'normal'}
	<button onclick={deleteDoc}>삭제</button>
{/if}

<style lang="scss">
	button {
		background-color: rgb(255, 220, 220);
	}

	button:hover {
		background-color: rgb(255, 200, 200);
	}
</style>
