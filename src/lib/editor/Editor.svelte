<script>
	import { onMount } from "svelte";
	import Showdown from "showdown";

	var converter = new Showdown.Converter();
	converter.setFlavor("github");
	converter.setOption("openLinksInNewWindow", true);
	converter.setOption("noHeaderId", true);

	function Update(e) {
		console.log(e.target.rows);
		//		let elMarkdown = document.getElementById("ed_xmarkdown");
		let elMarkdown = e.target;
		var html = converter.makeHtml(elMarkdown.value);
		document.getElementById("ed_html").textContent = html;
		document.getElementById("ed_preview").innerHTML = html;
		elMarkdown.rows =
			document.getElementById("ed_xmarkdown").value.split("\n").length +
			1;
	}

	function Show(e) {
		document.getElementById(e.target.id).classList.toggle("bg-blue-100");
		let actual = e.target.id.replace("ed_b", "ed_");
		document.getElementById(actual).classList.toggle("hidden");
		console.log(document.getElementById(actual).classList.value);
	}
</script>

<div>
	<button id="ed_bmarkdown" on:click={Show} class="border-2 bg-blue-100">
		Markdown
	</button>
	<button id="ed_bhtml" on:click={Show} class="border-2"> HTML </button>
	<button id="ed_bpreview" on:click={Show} class="border-2 bg-blue-100">
		Preview
	</button>

	<div class="panes">
		<div id="ed_markdown" class="pane">
			<textarea id="ed_xmarkdown" rows="2" on:input={Update} />
		</div>
		<div id="ed_html" class="hidden pane " />
		<div id="ed_preview" class="pane _mk" />
	</div>
</div>

<style>
	/* .panes {
		display: flex;
		list-style-type: none;
		flex-direction: row;
		align-items: flex-start;
		flex-wrap: nowrap;
	} */

	textarea {
		padding: 10px;
		margin: 10px 0 0 10px;
		background-color: wheat;
		overflow: auto;
		width: 98%;
	}

	/* div.pane {
		background-color: white;
		border: 2px;
		border-color: black;
		padding: 10px;
		margin: 10px 0 0 10px;
		flex: 1 1 50%;
		overflow: auto;
		overflow-wrap: break-word;
	} */
</style>
