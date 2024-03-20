<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import '../../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import Loader from '$lib/components/Loader.svelte';
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
		<img alt="cheqd logo" src="/cheqd-logo.png" class="h-10" />
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

	{#if $navigating}
		<div class="w-full h-full flex items-center justify-center">
			<Loader />
		</div>
	{:else}
		<slot />
	{/if}
</AppShell>
