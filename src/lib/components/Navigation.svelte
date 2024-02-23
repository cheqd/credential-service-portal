<script lang="ts">
	import { goto } from '$app/navigation';
	import BillingIcon from '$lib/icons/billingIcon.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	import { page } from '$app/stores';
	export let closeDrawer: () => void;
</script>

<div class="flex list-nav flex-col gap-6 p-4 items-start h-full shadow-md">
	<a
		class="btn tracking-wide rounded-lg hover:bg-tertiary-300 flex gap-2 justify-start items-center w-full text-start {$page
			.url.pathname === '/home' && 'bg-tertiary-300 lg:bg-primary-50'}"
		href="/home"
		on:click={() => {
			goto('/home');
			closeDrawer();
		}}
	>
		<HomeIcon class="h-5 w-5" />
		Home
	</a>
	<a
		class="btn tracking-wide rounded-lg hover:bg-tertiary-300 flex gap-2 justify-start items-center w-full text-start {$page
			.url.pathname === '/billing' && 'bg-tertiary-300 lg:bg-primary-50'}"
		href="/billing"
		on:click={() => {
			goto('/billing');
			closeDrawer();
		}}
	>
		<BillingIcon />
		Billing
	</a>
</div>
