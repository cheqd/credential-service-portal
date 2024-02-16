<script>
	import { goto } from '$app/navigation';
	import SettingsIcon from '$lib/icons/settingsIcon.svelte';
</script>

<div
	class="flex w-full justify-between items-center px-9 py-3 bg-tertiary-50/50 shadow-md shadow-tertiary-100"
>
	<button on:click={() => goto('/')} class="btn text-4xl font-black text-primary-400"
		>Splash
	</button>
	<SettingsIcon class="w-9 h-9 text-tertiary-500" />
</div>
