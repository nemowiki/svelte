<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';

	let { content }: { content: string | null } = $props();
	let html = $derived.by<string>(() => {
		if (!content) return '';
		const sanitized = DOMPurify.sanitize(content);
		return sanitized.replace('<div id="content"><div><br>', '<div id="content"><div>');
	});
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<article class="kmu">{@html html}</article>

<style lang="scss">
	@use '../../style/kmu.scss';
</style>
