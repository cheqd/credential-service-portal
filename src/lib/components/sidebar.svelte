<script>
	import { goto } from '$app/navigation';
	import BillingIcon from '$lib/icons/billingIcon.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
</script>

<div
	class="flex flex-col gap-6 py-6 items-start w-32 xl:w-52 bg-tertiary-50/50 border-r-4 border-tertiary-200/30 h-full"
>
	<button
		class="btn tracking-wide rounded-lg hover:bg-tertiary-300 flex gap-2 justify-start items-center w-full text-start"
		on:click={() => goto('/')}
	>
		<HomeIcon class="h-5 w-5" />
		Home
	</button>
	<button
		class="btn tracking-wide rounded-lg hover:bg-tertiary-300 flex gap-2 justify-start items-center w-full text-start"
		on:click={() => goto('/billing')}
	>
		<BillingIcon />
		Billing
	</button>
</div>
