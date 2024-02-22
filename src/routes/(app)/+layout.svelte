<script>
	import Header from '$lib/components/header.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import '../../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	export let data;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header user={data.user} class="bg-gradient-to-r from-primary-50 to-[#e8ebf4] h-20" />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>
	<slot />
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
</AppShell>
