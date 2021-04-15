<script lang="ts">
	import Editor from '$lib/editor/Editor.svelte';

	async function mdSave(mkd) {
		let resp = await fetch('admin/content/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ mkd })
		});
		const respo = await resp.json();
		return respo;
	}

	function mdSaveAs(mkd) {
		console.log('SaveAs');
	}
	function mdCancel() {
		console.log('Cancel');
	}
</script>

<Editor mdText={'blah blah blah'} {mdSave} {mdSaveAs} {mdCancel} />
<!-- <Editor mdText={'blah blah blah'} {mdSave} {mdSaveAs} /> -->
