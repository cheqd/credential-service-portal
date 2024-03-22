<script lang="ts">
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CurrentPlanCard from '$lib/components/CurrentPlanCard.svelte';
	import type { Product } from '$lib/types/types/product.types.js';
	import type {
		CreateSubscriptionRequestBody,
		CreateSubscriptionResponse,
		Subscription,
		UpdateSubscriptionRequestBody,
		UpdateSubscriptionResponse
	} from '$lib/types/types/subscription.types.js';
	import { env as pubEnv } from '$env/dynamic/public';

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
		const res = (await response.json()) as CreateSubscriptionResponse;
		console.log('create sub response', res);
		if (res.clientSecret) {
			window.location.href = res.clientSecret;
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
		const res = (await response.json()) as UpdateSubscriptionResponse;
		console.log('update sub response', res);
		if (res.clientSecret) {
			window.location.href = res.clientSecret;
		}
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

		// TODO: sort products by current plan

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
				<p class=" text-tertiary-900">Simple and transparent pricing that grows with you.</p>
			</div>
			<div class="no-scrollbar flex overflow-x-scroll space-x-8 p-4 justify-start -mx-8 lg:mx-0">
				{#if products}
					{#each products as p}
						<BillingPlanCard
							title={p.name}
							description={p.description}
							pricing={p.prices[0].unit_amount / 100}
							featuresTitle={p.name.toLowerCase() === 'starter'
								? 'Everything in Free trial and: '
								: 'Everything in starter and: '}
							features={p.features.map((f) => f.name)}
							isCustom={p.name.toLowerCase() === 'custom'}
							createSession={data.subscriptionNotFound ? createSubscription : updateSubscription}
							isCurrentPlan={p.id === currentPlan.id && !data.subscriptionNotFound}
							priceId={p.prices[0].id}
							currency={p.prices[0].currency}
						/>
					{/each}
				{/if}

				<!--TODO: We may require a user tracking endpoint in the credential service to manage users with custom plans and their selected features.  -->
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
</div>
