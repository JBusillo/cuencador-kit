import { writable } from 'svelte/store';
//import { LogIn } from 'src/routes/login.svelte'
//import components from "$lib/helpers/components";

export const drawerVisible = writable(false);
//export const mainComponent = writable(components.home)
export const drawerTree = writable(createDrawerTree());

function createDrawerTree() {
	return {
		Settings: {
			display: 'Settings',
			icon: 'SettingsIcon',
			href: ''
		},
		Login: {
			display: 'Login',
			icon: 'LogInIcon',
			href: ''
		},
		Logout: {
			display: 'Logout',
			icon: 'LogOutIcon',
			href: ''
		}
	};
}
