<script>
	import { drawerVisible } from "$lib/stores/navStore";

	function hideMenu() {
		if ($drawerVisible) {
			$drawerVisible = false;
		}
	}
</script>

<main>
	<h1>Hello world!</h1>

	<p>
		Visit <a class="text-blue-600 underline" href="https://svelte.dev"
			>svelte.dev</a
		> to learn how to build Svelte apps.
	</p>
</main>

<style lang="postcss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	}

	main {
		@apply text-center;
		@apply p-4;
		@apply m-0;
	}

	h1 {
		@apply text-red-600;
		@apply uppercase;
		@apply text-6xl;
		@apply font-thin;
		@apply leading-tight;
		@apply my-16 mx-auto;
		@apply max-w-xs;
	}

	p {
		@apply max-w-xs;
		@apply my-8 mx-auto;
		@apply leading-snug;
	}

	@screen sm {
		h1 {
			@apply max-w-none;
		}

		p {
			@apply max-w-none;
		}
	}
</style>
