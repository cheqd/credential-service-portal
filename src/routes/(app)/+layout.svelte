<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import '../../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	initializeStores();
	const drawerStore = getDrawerStore();

	const openDrawer = () => drawerStore.open({});
	export let data;
</script>

<Drawer bgDrawer="animated-bg">
	<button
		on:click={() => {
			goto('/home');
			drawerStore.close();
		}}
		class="p-4"
	>
		<img src="/cheqd-logo.png" class="h-10" />
	</button>
	<div class="bg-tertiary-500 h-[0.5px]" />
	<Navigation closeDrawer={drawerStore.close} />
</Drawer>
<AppShell slotSidebarLeft="w-0 lg:w-64">
	<svelte:fragment slot="header">
		<Header {openDrawer} user={data.user} />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation closeDrawer={() => {}} />
	</svelte:fragment>
	<slot />
</AppShell>
