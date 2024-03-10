<script lang="ts">
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CurrentPlanCard from '$lib/components/CurrentPlanCard.svelte';
	export let data;

	export const createSession = async () => {

		console.log('clicked')
		console.log(data.idToken);
        // console.log(event.locals.idToken);
		const requestBody = {
			// Here we need to setup the corresponding price of the product which should be get from CaaS
			price: 'price_1OoTbhC3ipfGA3blG7111wsv',
			successURL: 'https://d5ec-79-140-150-148.ngrok-free.app',
			cancelURL: 'https://d5ec-79-140-150-148.ngrok-free.app/admin/swagger'
		};
		const response = await fetch('/api/billing', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'content-type': 'application/json',
				'id-token': `${data.idToken}`

			}
		});
		window.location.href = (await response.json()).url;
	};

</script>

<div class=" h-full w-full flex flex-col gap-9">
	<div class="flex flex-col gap-24 p-9">
		<div class="flex flex-col gap-6">
			<CurrentPlanCard />
			<div class="flex flex-col">
				<span class="text-3xl tracking-wide font-semibold">All Plans</span>
				<p class=" text-tertiary-600">Simple and transparent pricing that grows with you.</p>
			</div>
			<div class="no-scrollbar flex overflow-x-scroll space-x-8 p-4 justify-start -mx-8 lg:mx-0">
				<BillingPlanCard
					title="Starter"
					description="Get a hands-On experience of Credential Service"
					pricing={99}
					featuresTitle="Everything in Free trial and"
					features={[
						'Credential Verification',
						'Create 10 Credentials',
						'Email Support',
						'Test Environment',
						'API access'
					]}
					isCustom={false}
					{createSession}
				/>

				<BillingPlanCard
					title="Business"
					description="Get a hands-On experience of Credential Service"
					pricing={499}
					featuresTitle="Everything in Starter and"
					features={[
						'Credential Verification',
						'Create 10 Credentials',
						'Email Support',
						'Test Environment',
						'API access'
					]}
					isCustom={false}
					{createSession}
				/>

				<BillingPlanCard
					title="Custom"
					description="Get a hands-On experience of Credential Service"
					pricing={-1}
					featuresTitle="Everything in Business and"
					features={[
						'Credential Verification',
						'Create 10 Credentials',
						'Email Support',
						'Test Environment',
						'API access'
					]}
					isCustom={true}
					{createSession}
				/>
			</div>
		</div>
	</div>
</div>
