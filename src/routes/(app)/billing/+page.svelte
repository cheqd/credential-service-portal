<script lang="ts">
	import { onMount } from 'svelte';
	import { createSubscription, updateSubscription } from '$lib/api/subscriptions';
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CurrentPlanCard from '$lib/components/CurrentPlanCard.svelte';
	import type { Product } from '$lib/types/types/product.types.js';
	import type { Subscription } from '$lib/types/types/subscription.types.js';
	import { env as pubEnv } from '$env/dynamic/public';

	export let data;

	let products: Product[] = [];
	let currentSubscription: Subscription = null;
	let currentPlan: Product | null = null;

	onMount(async () => {
		products = data?.products?.products.data ?? [];
		currentSubscription = data?.subscription ?? null;

		if (currentSubscription) {
			currentPlan =
				products.find((p) => p.id === currentSubscription?.items.data[0]?.plan.product) || null;
		}

		console.log('Current Plan:', currentPlan);
	});

	async function handleSubscription(priceId: string) {
		try {
			const idToken = data.idToken || null;
			if (data.subscriptionNotFound) {
				const createSub = await createSubscription(priceId, idToken);
				if (createSub.success) {
					window.location.href = createSub.data.clientSecret;
				}
			} else {
				const updateSub = await updateSubscription(idToken);
				if (updateSub.success) {
					window.location.href = updateSub.data.clientSecret;
				}
			}
		} catch (error) {
			console.error('Subscription error:', error);
		}
	}
</script>

<div class="h-full w-full flex flex-col gap-9">
	<div class="flex flex-col gap-24 p-9">
		{#if currentPlan}
			<CurrentPlanCard
				features={currentPlan.features.map((f) => f.name)}
				description={currentPlan.description}
				title={currentPlan.name}
			/>
		{/if}
		<div class="flex flex-col">
			<span class="text-3xl tracking-wide font-semibold">All Plans</span>
			<p class="text-tertiary-900">Simple and transparent pricing that grows with you.</p>
		</div>
		<div class="no-scrollbar flex overflow-x-scroll space-x-8 p-4 justify-start -mx-8 lg:mx-0">
			{#each products as product}
				<BillingPlanCard
					title={product.name}
					description={product.description}
					pricing={product.prices[0].unit_amount / 100}
					featuresTitle={product.name.toLowerCase() === 'starter'
						? 'Everything in Free trial and: '
						: 'Everything in starter and: '}
					features={product.features.map((f) => f.name)}
					isCustom={product.name.toLowerCase() === 'custom'}
					createSession={handleSubscription}
					isCurrentPlan={product.id === currentPlan?.id && !data.subscriptionNotFound}
					priceId={product.prices[0].id}
					currency={product.prices[0].currency}
				/>
			{/each}

			<BillingPlanCard
				title={pubEnv.PUBLIC_CUSTOM_BILLING_PLAN_TITLE}
				description={pubEnv.PUBLIC_CUSTOM_BILLING_PLAN_DESCRIPTION}
				pricing={pubEnv.PUBLIC_CUSTOM_BILLING_PLAN_PRICE}
				featuresTitle={pubEnv.PUBLIC_CUSTOM_BILLING_PLAN_FEATURES_TITLE}
				features={[]}
				createSession={async () => {}}
				isCustom={true}
				priceId={''}
				isCurrentPlan={false}
			/>
		</div>
	</div>
</div>
