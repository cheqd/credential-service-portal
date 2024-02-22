<script>
	import { goto } from '$app/navigation';
	import SettingsIcon from '$lib/icons/settingsIcon.svelte';
</script>

<div class="flex relative w-full justify-between items-center md:px-16 px-8 z-50 bg-inherit">
	<button
		on:click={() => {
			console.log('on click');
		}}
	>
		<img src="/cheqd-logo.png" class="md:h-10 h-5" />
	</button>
	<div class="flex space-x-2 w-1/2 items-center justify-end">
		<span class="hidden md:block">Already have an account?</span>
		<div class="flex justify-end md:justify-start">
			<button
				class="btn bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xl rounded-3xl flex"
			>
				<span>Sign in</span>
			</button>
		</div>
	</div>
</div>
