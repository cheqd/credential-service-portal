<script lang="ts">
	import CheckIcon from '$lib/icons/checkIcon.svelte';
	export let title: string;
	export let description: string;
	export let pricing: number;
	export let featuresTitle: string;
	export let features: string[];
	export let isCustom: boolean = false;
</script>

<div
	class="flex-shrink-0 w-80 rounded border border-tertiary-200 shadow-lg hover:bg-gradient-to-b transition-transform duration-500 hover:translate-y-2 hover:scale-105 hover:border-0 from-primary-100 to-white flex flex-col gap-3 p-6 items-start"
>
	<span class="text-3xl font-semibold text-primary-500">{title} </span>
	<p class="text-tertiary-700">{description}</p>
	<div class="h-px w-full bg-tertiary-300"></div>
	<div class="flex gap-2 items-end text-tertiary-900 py-3">
		{#if isCustom}
			<span class="text-4xl font-bold">Talk to Us</span>
		{:else}
			<span>from</span>

			<span class="text-4xl font-bold">${pricing}</span>

			<span>/</span>
			<span>mo</span>
		{/if}
	</div>
	<button class="btn variant-filled-primary px-6 text-lg my-3 bg-primary-400"
		>Upgrade to {title} now</button
	>
	<div class="flex flex-col text-surface-900">
		<span class="font-semibold">{featuresTitle}:</span>
		<div class="flex flex-col gap-3 py-3">
			{#each features as feat}
				<span class="flex gap-1 items-center"><CheckIcon class="text-success-400" />{feat}</span>
			{/each}
		</div>
	</div>
</div>
