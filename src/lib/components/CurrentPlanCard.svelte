<script lang="ts">
	import CheckIcon from '$lib/icons/checkIcon.svelte';

	export let title: string = '';
	export let description: string = '';
	export let features: string[] = [];
	export let trialDaysLeft: number | null = null;

	let firstSliceOfFeatures = features.slice(0, features.length / 2);
	let secondSliceOfFeatures = features.slice(features.length / 2);
</script>

<div class="flex flex-col gap-3">
	<span class="text-3xl tracking-wide font-semibold">Plan & Billing</span>
	<div class=" rounded-lg border border-tertiary-300 p-6 flex flex-col gap-5 animated-bg">
		<span class="md:text-4xl text-2xl text-secondary-900 tracking-wide font-semibold"
			>My Plan:
			{title}
		</span>
		<p class="text-tertiary-900">
			{description}
		</p>
		<div class="flex flex-col lg:gap-2">
			<div class="flex flex-col lg:grid grid-cols-4 gap-3 lg:space-x-6 text-tertiary-900">
				{#each firstSliceOfFeatures as feat}
					<span class="flex gap-1 items-center"><CheckIcon class="text-success-400" />{feat}</span>
				{/each}
			</div>
			<div class="flex flex-col gap-3 lg:grid grid-cols-4 lg:space-x-6 text-tertiary-900">
				{#each secondSliceOfFeatures as feat}
					<span class="flex gap-1 items-center"><CheckIcon class="text-success-400" />{feat}</span>
				{/each}
			</div>
		</div>

		{#if trialDaysLeft && trialDaysLeft > 1}
			<div>
				<span class="text-xl text-secondary-900">
					Your trial ends in <span class="font-semibold text-primary-500">{trialDaysLeft} </span> days
				</span>
			</div>
		{/if}
	</div>
</div>
