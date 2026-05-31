<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FileUp from '@lucide/svelte/icons/file-up';
	import { Groups, UserStates } from '@nemowiki/core/types';

	const canUpload = $derived(
		page.data.user.group !== Groups.Guest && page.data.user.state !== UserStates.Blocked
	);

	function uploadBtnClick() {
		goto('/f');
	}
</script>

{#if canUpload}
	<div>
		<button class="upload-btn container" onclick={uploadBtnClick}>
			<FileUp size="1.4rem" /><span>업로드</span>
		</button>
	</div>
{/if}

<style>
	.upload-btn {
		padding: 0.4rem 1rem;
		border-radius: 2rem;
		color: var(--color-primary-1);
		border-color: var(--color-primary-2);
		background-color: var(--color-primary-3);
	}
	.upload-btn:hover {
		background-color: var(--color-primary-2);
		border-color: var(--color-primary-2);
		color: white;
	}
</style>
