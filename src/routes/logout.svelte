<script>
//	import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { Accordion, AccordionItem } from "carbon-components-svelte";

	onMount(async () => {
		// if (browser) {
		// 	await ClassicEditor.create(document.querySelector('#editor')).catch((error) => {
		// 		console.error(error);
		// 	});
		// }
	});
</script>

<h1>About</h1>
<p>SvelteKit is awesome!</p>
<a href="/">Go back home</a>
<!-- <div id="editor" /> -->
  
  <Accordion>
	<AccordionItem title="Section 1" open> Content 1 </AccordionItem>
	<AccordionItem title="Section 2"> Content 2 </AccordionItem>
	<AccordionItem title="Section 3"> Content 3 </AccordionItem>
  </Accordion>
