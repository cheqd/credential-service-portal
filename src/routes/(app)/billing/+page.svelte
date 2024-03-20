<script lang="ts">
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CurrentPlanCard from '$lib/components/CurrentPlanCard.svelte';
	import type { Product } from '$lib/types/types/product.types.js';
	import type { Subscription } from '$lib/types/types/subscription.types.js';
	import { onMount } from 'svelte';

	export let data;

	let products: Product[];
	let currentSubscription: Subscription | null;
	let currentPlan: Product;

	export const createSession = async (priceId: string) => {
		// console.log('clicked');
		// console.log(data.idToken);
		// // console.log(event.locals.idToken);
		// const requestBody = {
		// 	// Here we need to setup the corresponding price of the product which should be get from CaaS
		// 	price: priceId,
		// 	successURL: 'http://localhost:3002/home',
		// 	cancelURL: 'https://d5ec-79-140-150-148.ngrok-free.app/admin/swagger'
		// };
		// const response = await fetch('/api/billing', {
		// 	method: 'POST',
		// 	body: JSON.stringify(requestBody),
		// 	headers: {
		// 		'content-type': 'application/json',
		// 		'id-token': `${data.idToken}`
		// 	}
		// });
		// console.log('response', response.status);
		// // console.log('response data', await response.json());
		// const res = await response.json();
		// console.log('res', res);
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
							{createSession}
							isCurrentPlan={true}
							priceId={p.prices[0].id}
						/>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
