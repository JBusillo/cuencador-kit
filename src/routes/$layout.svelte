<script>
	//		"svelte-hmr": "0.13.1",

	import '../global.css';
	import Icons from '$lib/icons/feather.svelte';
	import SideDrawer from '$lib/SideDrawer.svelte';
	import { drawerVisible } from '$lib/stores/navStore';
	import { loggedIn } from '$lib/stores/loginStore';

	function handleClick() {
		console.log('clicked');
	}

	function showMenu() {
		$drawerVisible = true;
	}
	function hideMenu() {
		if ($drawerVisible) {
			$drawerVisible = false;
		}
	}
</script>

<!-- class="container max-w-full min-w-full min-h-screen p-0 m-0" -->

<main class="container max-w-full min-w-screen min-h-screen p-0 m-0" on:click={hideMenu}>
	<div
		class="container fixed bg-gradient-to-r p-1 from-green-500 to-blue-100 top-0 left-0 min-w-full items-start flex flex-row flex-nowrap content-center"
	>
		<div
			on:click|stopPropagation={showMenu}
			class="flex-grow-0 justify-self-end p-1 hover:bg-purple-700"
		>
			<Icons on:click={handleClick} name="MenuIcon" size="30" />
		</div>

		<div class="flex-grow place-self-center text-3xl text-center">CUENCADOR</div>
		<div on:click={handleClick} class="flex-grow-0 justify-self-end p-1 hover:bg-purple-700">
			<Icons name="LogInIcon" size="30" />
		</div>
		<div on:click={handleClick} class="flex-grow-0 justify-self-end p-1 hover:bg-purple-700">
			<Icons name="MoonIcon" size="35" />
		</div>
		<div on:click={handleClick} class="flex-grow-0 justify-self-end p-1 hover:bg-purple-700">
			<Icons name="HelpCircleIcon" size="35" />
		</div>
		<div on:click={handleClick} class="flex-grow-0 justify-self-end p-1 hover:bg-purple-700">
			<Icons name="GlobeIcon" size="35" />
		</div>
	</div>

	<slot />

	{#if $drawerVisible}
		<SideDrawer />
	{/if}

	{#if $loggedIn}
		<div>Logged In!!!!</div>
	{/if}
</main>
