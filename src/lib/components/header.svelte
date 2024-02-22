<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { UserInfoResponse } from '@cntr/sveltekit';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/stores';
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';

	export let user: UserInfoResponse | null = null;

	let isSigninLoading = false;
	const handleSigninSubmit: SubmitFunction = () => {
		isSigninLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					window.open(result.data?.location || undefined, '_self');
					break;
				case 'failure':
					// handle error here
					await applyAction(result);
					await update();
					break;
				case 'error':
					// handle server side error here
					await update();
					await applyAction(result);
					break;
				default:
					await update();
			}
			isSigninLoading = false;
		};
	};

	let isSignOutLoading = false;
	const handleSignout = async () => {
		isSignOutLoading = true;
		const response = await fetch('/api/logto/signout', {
			method: 'DELETE',
			redirect: 'manual'
		});

		if (response.status === 201) {
			sessionStorage.clear();
			window.open(response.headers.get('Location')!, '_self');
		}
		isSignOutLoading = false;
		console.error('signout error: ', await response.text());
	};
</script>

<div
	class={twMerge(
		'flex relative w-full justify-between items-center md:px-16 px-8 z-50 bg-inherit',
		$$props['class']
	)}
>
	<button
		on:click={() => {
			goto('/home');
		}}
	>
		<img src="/cheqd-logo.png" class="md:h-10 h-5" />
	</button>
	{#if !user && $page.url.pathname === '/'}
		<form
			method="POST"
			action="/?/signin"
			class="flex space-x-2 w-1/2 items-center justify-end"
			use:enhance={handleSigninSubmit}
		>
			<span class="hidden md:block">Already have an account?</span>

			<div class="flex justify-end md:justify-start">
				<button
					class="btn bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xl rounded-2xl flex"
				>
					{#if isSigninLoading}
						<LoaderIcon />
					{/if}
					<span>Sign in</span>
				</button>
			</div>
		</form>
	{/if}

	{#if user && $page.url.pathname !== '/'}
		<button
			on:click={handleSignout}
			class=" btn bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xl rounded-2xl flex py-2"
		>
			{#if isSignOutLoading}
				<LoaderIcon />
			{/if}
			<span>Sign out</span>
		</button>
	{/if}
</div>
