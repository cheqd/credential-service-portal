<script lang="ts">
	import { goto } from '$app/navigation';
	import BillingIcon from '$lib/icons/billingIcon.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	export let closeDrawer: () => void;
</script>

<div class="flex list-nav flex-col gap-6 p-4 items-start h-full shadow-md">
	<a
		class="btn tracking-wide rounded-lg hover:bg-tertiary-300 flex gap-2 justify-start items-center w-full text-start"
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
		class="btn tracking-wide rounded-lg hover:bg-tertiary-300 flex gap-2 justify-start items-center w-full text-start"
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
