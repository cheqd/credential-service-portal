<script lang="ts">
	const handleSignout = async () => {
		const response = await fetch('/api/logto/signout', {
			method: 'DELETE',
			redirect: 'manual'
		});

		if (response.status === 201) {
			sessionStorage.clear();
			window.open(response.headers.get('Location')!, '_self');
		}

		console.error('signout error: ', await response.text());
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<button on:click={handleSignout}>Sign out</button>
</div>
