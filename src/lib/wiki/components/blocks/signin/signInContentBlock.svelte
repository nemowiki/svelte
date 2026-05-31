<script lang="ts">
	import GoogleModule from '$lib/wiki/components/layout/googleModule.svelte';
</script>

<div class="signin-content">
	<p>로그인하면 문서 편집 및 다양한 기능을 사용할 수 있습니다.</p>
	<GoogleModule />
</div>

<style>
	.signin-content {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		padding: 0.4rem 0;
	}
	p {
		color: var(--color-sub);
		font-size: var(--font-sm);
	}
</style>
