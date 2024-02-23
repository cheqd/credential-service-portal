<script lang="ts">
	import BillingPlanCard from '$lib/components/BillingPlanCard.svelte';
	import CheckIcon from '$lib/icons/checkIcon.svelte';
</script>

<div class=" h-full w-full flex flex-col gap-9">
	<div class="flex flex-col gap-24 p-9">
		<div class="flex flex-col gap-3">
			<span class="text-3xl tracking-wide font-semibold">Plan & Billing</span>
			<div class=" rounded-lg border border-tertiary-300 p-6 flex flex-col gap-5">
				<span class="text-4xl text-primary-500/80 tracking-wide font-semibold"
					>My Plan: Free Trial</span
				>
				<p class="text-tertiary-600">
					Try our features for free with a 14-day trial on our testing environment and assess
					whether they meet your requirements.
				</p>
				<div class="flex lg:flex-col lg:gap-2 gap-9">
					<div class="flex flex-col lg:grid grid-cols-4 gap-3 lg:space-x-6 text-tertiary-700">
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />1 organisation</span
						>
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />Create 10 Credentials</span
						>
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />Email Support</span
						>
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />Credential Verification</span
						>
					</div>
					<div class="flex flex-col gap-3 lg:grid grid-cols-4 lg:space-x-6 text-tertiary-700">
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />Credential template design</span
						>
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />Test Environment</span
						>
						<span class="flex gap-1 items-center"
							><CheckIcon class="text-success-400" />API access</span
						>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-6">
			<div class="flex flex-col">
				<span class="text-3xl tracking-wide font-semibold">All Plans</span>
				<p class=" text-tertiary-600">Simple and transparent pricing that grows with you.</p>
			</div>
			<div class="flex flex-col justify-start lg:grid grid-cols-3 place-content-center gap-12">
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
