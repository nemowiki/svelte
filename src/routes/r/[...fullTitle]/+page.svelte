<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';

	import ReadHeader from '$lib/components/pages/read/readHeader.svelte';
	import ReadCaution from '$lib/components/pages/read/readCaution.svelte';
	import HtmlContent from '$lib/components/common/htmlContent.svelte';

	let { data } = $props();

	let fullTitle = $derived<string>(data.fullTitle as string);
	let rev = $derived<number>(data.rev as number);
	let doc = $derived<Doc | null>(JSON.parse(data.doc || 'null'));

	let ok = $derived<boolean>(data.ok as boolean);
	let reason = $derived<string>(data.reason as string);

	let html = $derived.by<string>(() => {
		if (reason) return reason;
		return doc?.html || '';
	});
</script>

<ReadHeader {fullTitle} info={doc} />
<ReadCaution {ok} {rev} />
<HtmlContent content={html} />
