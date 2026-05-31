<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p class="msg info"><span>[알림]</span> {@render children()}</p>
{/if}
