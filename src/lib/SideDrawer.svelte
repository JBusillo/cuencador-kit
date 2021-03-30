<script>
    import "../global.css";
    import Icons from "$lib/icons/feather.svelte";
    import { drawerVisible } from "$lib/stores/navStore";
    //    import components from "deleted/components";

    function handleClick() {
        $drawerVisible = false;
    }
</script>

<div
    class="container bg-gray-800 fixed text-white z-10 p-2 top-0 left-0 min-w-full items-start flex flex-col flex-nowrap content-center"
>
    <div
        on:click={handleClick}
        class="flex-grow-0 justify-self-end hover:bg-purple-700"
    >
        <Icons on:click={handleClick} name="MenuIcon" size="30" />
    </div>
    <!-- ----------------------------------------------------------------------------------------- -->
    <a href="/Ssettings" on:click={handleClick} class="drawer-item border-t">
        <div class="m-2">
            <Icons name="SettingsIcon" size="30" />
        </div>

        <span class="m-2 align-middle">Settings</span>
    </a>
    <!-- ----------------------------------------------------------------------------------------- -->
    <a href="/Login" on:click={handleClick} class="drawer-item">
        <div class="m-2">
            <Icons name="LogInIcon" size="30" />
        </div>

        <span class="m-2 align-middle">Log In</span>
    </a>
    <!-- ----------------------------------------------------------------------------------------- -->
    <a href="/Logout" on:click={handleClick} class="drawer-item">
        <div class="m-2">
            <Icons name="LogOutIcon" size="30" />
        </div>

        <span class="m-2 align-middle">Log Out</span>
    </a>
    <!-- ----------------------------------------------------------------------------------------- -->
    <div on:click={handleClick} class="drawer-item">
        <div class="m-2">
            <Icons name="MailIcon" size="30" />
        </div>

        <a href="/Mail" class="m-2 align-middle">Mail</a>
    </div>

    <div on:click={handleClick} class="drawer-item">
        <div class="m-2">
            <Icons name="InfoIcon" size="30" />
        </div>
        <a href="/logout">About Cuencador</a>
    </div>
</div>

<style lang="postcss">
    .drawer-item {
        @apply border-white border-solid space-x-3 space-y-2 border-b flex flex-row;
    }
</style>
