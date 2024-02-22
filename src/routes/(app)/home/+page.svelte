<script lang="ts">
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';
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

<div class="w-full h-full flex justify-center items-center">
	<button
		on:click={handleSignout}
		class=" btn bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xl rounded-2xl flex py-2"
	>
		{#if isSignOutLoading}
			<LoaderIcon />
		{/if}
		<span>Sign out</span>
	</button>
</div>
