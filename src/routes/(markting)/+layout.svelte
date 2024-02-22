<script>
	import Header from '$lib/components/header.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import '../../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<slot />
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
</AppShell>
