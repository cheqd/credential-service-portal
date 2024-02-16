<script lang="ts">
	import { goto } from '$app/navigation';
	import ArrowIcon from '$lib/icons/arrowIcon.svelte';
</script>

<div class="h-full bg-gradient-to-r from-primary-100 to-white flex justify-center items-center">
	<div
		class="flex flex-col bg-white p-6 rounded-lg border-tertiary-200 text-start items-center text-tertiary-900 w-1/3 gap-1"
	>
		<span class="text-3xl text-primary-400 font-semibold tracking-wide self-start px-3"
			>Sign-in</span
		>
		<div class="h-0.5 bg-tertiary-200 w-full rounded"></div>
		<div class="flex flex-col gap-3 w-11/12 py-6">
			<input
				type="text"
				name="username"
				placeholder="Username"
				class=" h-12 border border-tertiary-100 rounded-lg px-3 focus:outline-primary-300"
				id=""
			/>
			<input
				type="text"
				name="email"
				placeholder="Email"
				class=" h-12 border border-tertiary-100 rounded-lg px-3 focus:outline-primary-300"
				id=""
			/>

			<button
				on:click={() => goto('/billing')}
				class="btn variant-filled-primary flex gap-2 items-center bg-primary-400"
				>Confirm <ArrowIcon /></button
			>
		</div>
		<div class="flex gap-3 items-center text-tertiary-800 w-11/12">
			<div class="h-px bg-tertiary-200 w-full rounded"></div>
			<span>or</span>
			<div class="h-px bg-tertiary-200 w-full rounded"></div>
		</div>

		<div class="flex flex-col gap-3 w-11/12 py-6">
			<button class="btn border-2 border-primary-300 rouded text-primary-400"
				>Sign in with Gmail</button
			>
			<button class="btn border-2 border-tertiary-300 rouded text-tertiary-600"
				>Sign in with Github</button
			>
		</div>
	</div>
</div>
