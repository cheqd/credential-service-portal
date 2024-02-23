<script lang="ts">
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CurrentPlanCard from '$lib/components/CurrentPlanCard.svelte';
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
				/>
			</div>
		</div>
	</div>
</div>
