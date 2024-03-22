<script lang="ts">
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';
	import CheckIcon from '$lib/icons/checkIcon.svelte';
	export let title: string;
	export let description: string;
	export let pricing: number | string;
	export let featuresTitle: string;
	export let features: string[];
	export let isCustom: boolean = false;
	export let isCurrentPlan: boolean = false;
	export let priceId: string;
	import { env as pubEnv } from '$env/dynamic/public';

	export let createSession: (priceId: string) => Promise<void>;
	let isLoading = false;
	$: console.log('isCurrent', isCurrentPlan, title);
	const styling = `flex-shrink-0 w-72 lg:w-80 rounded  ${isCurrentPlan ? ' border-[0.5px] bg-gray-100/25 border-primary-400 ' : ' bg-[#e8ebf4] hover:bg-gradient-to-b transition-transform duration-500 hover:translate-y-2 hover:scale-105 hover:border-0 from-primary-100 to-white'}   shadow-lg  flex flex-col gap-3 p-6 items-start`;
</script>

<div class={styling}>
	<span class="text-3xl font-semibold text-primary-500">{title} </span>
	<p class="text-tertiary-900">{description}</p>
	<div class="h-px w-full bg-tertiary-300"></div>
	<div class="flex gap-2 items-end text-tertiary-900 py-3">
		{#if isCustom}
			<span class="text-4xl font-bold">{pricing}</span>
		{:else}
			<span>from</span>

			<span class="text-4xl font-bold">${pricing}</span>

			<span>/</span>
			<span>mo</span>
		{/if}
	</div>
	<button
		class="btn variant-filled-primary px-6 text-lg my-3 bg-primary-400 w-full"
		on:click={async () => {
			isLoading = true;
			if (!isCustom) {
				await createSession(priceId);
			} else {
				window.open(pubEnv.PUBLIC_CUSTOM_BILLING_CONTACT_US_PAGE_URL, '_self');
			}
			isLoading = false;
		}}
		disabled={isCurrentPlan || isLoading}
	>
		{isCurrentPlan ? `Current Plan: ${title}` : `Switch to ${title} now`}
		{#if isLoading}
			<LoaderIcon class="ml-2 h-5 w-5" />
		{/if}
	</button>
	<div class="flex flex-col text-tertiary-900">
		<span class="font-semibold">{featuresTitle}</span>
		<div class="flex flex-col gap-3 py-3">
			{#each features as feat}
				<span class="flex gap-1 items-center"><CheckIcon class="text-success-400" />{feat}</span>
			{/each}
		</div>
	</div>
</div>
