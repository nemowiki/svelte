<script lang="ts">
	import CommonHeader from '$lib/components/common/commonHeader.svelte';
	import { signIn } from '@auth/sveltekit/client';
</script>

<CommonHeader description="위키에 오신 것을 환영합니다." />
<button onclick={() => signIn('google')}>Google로 로그인</button>
