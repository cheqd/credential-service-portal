<script lang="ts">
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CurrentPlanCard from '$lib/components/CurrentPlanCard.svelte';
	import type { Product } from '$lib/types/types/product.types.js';
	import type {
		CreateSubscriptionRequestBody,
		Subscription,
		UpdateSubscriptionRequestBody
	} from '$lib/types/types/subscription.types.js';
	import { onMount } from 'svelte';

	export let data;

	let products: Product[];
	let currentSubscription: Subscription | null;
	let currentPlan: Product;

	export const createSubscription = async (priceId: string) => {
		const requestBody = {
			price: priceId,
			successURL: 'http://localhost:3002/home',
			cancelURL: 'http://localhost:3002/home'
		} as CreateSubscriptionRequestBody;
		const response = await fetch('/api/billing/subscription/create', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'id-token': data.idToken || ''
			}
		});
		console.log('create sub res status', response.status);
		// console.log('response data', await response.json());
		const res = await response.json();
		console.log('create sub response', res);
		if (res.url) {
			window.location.href = res.url;
		}
	};

	export const updateSubscription = async (priceId: string) => {
		const requestBody = {
			returnUrl: 'http://localhost:3002/home'
		} as UpdateSubscriptionRequestBody;
		const response = await fetch('/api/billing/subscription/update', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'id-token': data.idToken || ''
			}
		});
		console.log('create sub res status', response.status);
		// console.log('response data', await response.json());
		const res = await response.json();
		console.log('create sub response', res);
		// if (res.url) {
		// 	window.location.href = res.url;
		// }
	};

	$: console.log('is loading');
	onMount(async () => {
		products = data.products?.products.data;
		currentSubscription = data.subscription;
		console.log('current sub', currentSubscription);
		console.log('data', data);
		currentPlan = products.filter(
			(p) => p.id === currentSubscription?.items.data[0].plan.product
		)[0];
		console.log('current plan', currentPlan);
	});
</script>

<div class=" h-full w-full flex flex-col gap-9">
	<div class="flex flex-col gap-24 p-9">
		<div class="flex flex-col gap-6">
			{#if products && currentSubscription}
				<CurrentPlanCard
					features={currentPlan.features.map((f) => {
						return f.name;
					})}
					description={currentPlan.description}
					title={currentPlan.name}
				/>
			{/if}
			<div class="flex flex-col">
				<span class="text-3xl tracking-wide font-semibold">All Plans</span>
				<p class=" text-tertiary-600">Simple and transparent pricing that grows with you.</p>
			</div>
			<div class="no-scrollbar flex overflow-x-scroll space-x-8 p-4 justify-start -mx-8 lg:mx-0">
				{#if products}
					{#each products as p}
						<BillingPlanCard
							title={p.name}
							description={p.description}
							pricing={p.prices[0].unit_amount / 100}
							featuresTitle={'Everything in Free trial and'}
							features={p.features.map((f) => f.name)}
							isCustom={p.name.toLowerCase() === 'custom'}
							createSession={updateSubscription}
							isCurrentPlan={p.id === currentPlan.id}
							priceId={p.prices[0].id}
						/>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
