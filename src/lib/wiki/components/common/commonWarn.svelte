<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p class="msg warn"><span>[주의]</span> {@render children()}</p>
{/if}
