<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p class="msg err"><span>[오류]</span> {@render children()}</p>
{/if}
