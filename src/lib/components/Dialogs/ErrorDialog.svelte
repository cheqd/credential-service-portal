<script lang="ts">
	import ErrorIcon from '$lib/icons/ErrorIcon.svelte';
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';

	export let parent: any;
	export let errorMessage: string;
	export let title: string;
	export let confirmButtonLabel: string;
	export let handleSuccess: () => Promise<void> = async () => {};
	export let handleClose: () => void = parent.onClose;
	export let enableRetry = false;

	let isLoading = false;
	const wrapOnSuccessHandler = async () => {
		isLoading = true;
		await handleSuccess();
		isLoading = false;
		parent.onClose();
	};
</script>

<div
	class="border-surface-400 bg-[#e8ebf4] relative flex flex-col items-center justify-center gap-6 rounded-lg border px-11 py-6 lg:min-h-[300px] lg:min-w-[500px]"
>
	<div class="flex flex-col items-center justify-center gap-2">
		<ErrorIcon />
		<span class="text-primary-400 text-2xl">{title}</span>
	</div>
	<div class="">
		<p class="text-secondary-900 max-w-md text-center antialiased">
			{errorMessage}
		</p>
	</div>
	<div class="flex gap-9">
		<button
			class="btn bg-primary-400 text-secondary-900 rounded-lg focus-visible:outline-0"
			on:click={handleClose}>Close</button
		>
		{#if enableRetry}
			<button
				class="variant-filled-primary btn flex items-center justify-center gap-2"
				on:click={wrapOnSuccessHandler}
			>
				{#if isLoading}
					Loading
					<LoaderIcon class="text-surface-600 mx-1" />
				{:else}
					{confirmButtonLabel ?? 'Retry'}
				{/if}
			</button>
		{/if}
	</div>
</div>
