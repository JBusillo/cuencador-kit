<script lang="ts">
	import Showdown from 'showdown';
	import { onMount } from 'svelte';
	import escapeHtml from 'escape-html';

	export let mdText = '';
	export let mdSave = null; // (md: string) => {};
	export let mdSaveAs = null; // (md: string) => {};
	export let mdCancel = null; //() => {};

	var preview = '';
	var html = '';
	var elMarkdown: HTMLTextAreaElement;
	var modal = false;

	onMount(() => {
		elMarkdown = <HTMLTextAreaElement>document.getElementById('ed_xmarkdown');
		elMarkdown.value = mdText;
		Update();
	});

	var converter = new Showdown.Converter();
	converter.setFlavor('github');
	converter.setOption('openLinksInNewWindow', true);
	converter.setOption('noHeaderId', true);

	function Update() {
		preview = html = converter.makeHtml(escapeHtml(elMarkdown.value));
		elMarkdown.rows = elMarkdown.value.split('\n').length + 1;
	}

	function Show(e) {
		document.getElementById(e.target.id).classList.toggle('bg-blue-100');
		let actual = e.target.id.replace('ed_b', 'ed_');
		document.getElementById(actual).classList.toggle('hidden');
	}

	function Save() {
		modal = true;
		mdSave(elMarkdown.value);
	}

	function SaveAs() {
		modal = true;
		mdSaveAs(elMarkdown.value);
	}

	function Cancel() {
		mdCancel();
	}

	function Revert() {
		elMarkdown.value = mdText;
		Update();
	}

	function closeModal() {
		modal = false;
	}
</script>

<div class="overflow-y-scroll">
	<div class="flex flex-row flex-nowrap items-start">
		<button id="ed_bmarkdown" on:click={Show} class="w-24 mx-2 border-2 bg-blue-100">
			Markdown
		</button>
		<button id="ed_bhtml" on:click={Show} class="w-24 mx-2 border-2"> HTML </button>
		<button id="ed_bpreview" on:click={Show} class="w-24 mx-2 border-2 bg-blue-100">
			Preview
		</button>
		<span class="flex-auto" />
		{#if mdSave}
			<button on:click={Save} class="w-24 mx-2 border-2 bg-blue-100 "> Save </button>
		{/if}

		{#if mdSave}
			<button on:click={SaveAs} class="w-24 mx-2 border-2 bg-blue-100 "> Save As</button>
		{/if}

		<button on:click={Revert} class="w-24 mx-2 border-2 bg-blue-100"> Revert </button>
		{#if mdCancel}
			<button on:click={Cancel} class="w-24 mx-2 border-2 bg-blue-100"> Cancel </button>
		{/if}
	</div>

	<div class="panes">
		<div id="ed_markdown" class="pane">
			<textarea id="ed_xmarkdown" rows="2" class="resize-none border-none" on:input={Update} />
		</div>
		<div id="ed_html" class="hidden pane">{html}</div>
		<div id="ed_preview" class="pane _mk">{@html preview}</div>
	</div>
</div>

{#if modal}
	<div class="modal-background" on:click={closeModal} />
	<div class="modal">This is some modal stuff</div>
{/if}

<style>
	textarea {
		padding: 10px;
		margin: 10px 0 0 10px;
		background-color: wheat;
		overflow: auto;
		width: 98%;
	}

	textarea:focus {
		outline-offset: 0px !important;
		outline: none !important;
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}
</style>
