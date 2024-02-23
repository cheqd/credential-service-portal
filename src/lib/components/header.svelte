<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { UserInfoResponse } from '@cntr/sveltekit';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';

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

	export let user: UserInfoResponse | null = null;
	export let openDrawer: () => void;
</script>

<AppBar
	background={user && $page.url.pathname !== '/'
		? 'bg-gradient-to-b from-primary-50 to-[#e8ebf4] shadow-lg lg:px-8'
		: 'lg:px-8'}
>
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			{#if user && $page.url.pathname !== '/'}
				<button class="lg:hidden btn btn-sm mr-4" on:click={openDrawer}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-primary-400 w-5 h-5 md:w-6 md:h-6">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
			{/if}
			<button
				on:click={() => {
					goto('/home');
				}}
			>
				<img src="/cheqd-logo.png" class="md:h-10 h-5" />
			</button>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if !user && $page.url.pathname === '/'}
			<form
				method="POST"
				action="/?/signin"
				class="flex space-x-2 w-full items-center justify-end"
				use:enhance={handleSigninSubmit}
			>
				<span class="hidden md:block">Already have an account?</span>

				<div class="flex justify-end md:justify-start">
					<button
						class="btn btn-sm text-sm bg-gradient-to-r from-primary-500 to-primary-400 text-white md:text-base rounded-xl flex"
					>
						{#if isSigninLoading}
							<LoaderIcon class="h-4 w-4" />
						{/if}
						<span>Sign in</span>
					</button>
				</div>
			</form>
		{/if}

		{#if user && $page.url.pathname !== '/'}
			<button
				on:click={handleSignout}
				class="btn btn-sm text-sm bg-gradient-to-r from-primary-500 to-primary-400 text-white md:text-base rounded-xl flex"
			>
				{#if isSignOutLoading}
					<LoaderIcon />
				{/if}
				<span>Sign out</span>
			</button>
		{/if}
	</svelte:fragment>
</AppBar>
