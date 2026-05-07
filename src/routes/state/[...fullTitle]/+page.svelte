<script lang="ts">
	import StateHeader from '$lib/wiki/components/pages/state/stateHeader.svelte';
	import StateForm from '$lib/wiki/components/pages/state/stateForm.svelte';

	let { data } = $props();
</script>

<article>
	<StateHeader />
	<StateForm doc={JSON.parse(data.doc)} />
</article>
