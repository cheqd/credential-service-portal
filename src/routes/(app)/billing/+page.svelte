<script lang="ts">
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
				<div
					class="rounded border border-tertiary-200 shadow-lg hover:bg-gradient-to-b transition-transform duration-500 hover:translate-y-2 hover:scale-105 hover:border-0 from-primary-100 to-white flex flex-col gap-3 p-6 items-start"
				>
					<span class="text-3xl font-semibold text-primary-500">Starter </span>
					<p class="text-tertiary-700">Get a hands-On experience of caas with Splash</p>
					<div class="h-px w-full bg-tertiary-300"></div>
					<div class="flex gap-2 items-end text-tertiary-900 py-3">
						<span>from</span>
						<span class="text-4xl font-bold">$99</span>
						<span>/</span>
						<span>mo</span>
					</div>
					<button class="btn variant-filled-primary px-6 text-lg w-full my-3 bg-primary-400"
						>Upgrade to Starter now</button
					>
					<div class="flex flex-col text-surface-900">
						<span class="font-semibold">Everything in Free trial and:</span>
						<div class="flex flex-col gap-3 py-3">
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Credential Verification</span
							>
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Create 10 Credentials</span
							>
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Email Support</span
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

				<div
					class="rounded border border-tertiary-200 shadow-lg hover:bg-gradient-to-b transition-transform duration-500 hover:translate-y-2 hover:scale-105 hover:border-0 from-primary-100 to-white flex flex-col gap-3 p-6 items-start"
				>
					<span class="text-3xl font-semibold text-primary-500">Business </span>
					<p class="text-tertiary-700">Get a hands-On experience of caas with Splash</p>
					<div class="h-px w-full bg-tertiary-300"></div>
					<div class="flex gap-2 items-end text-tertiary-900 py-3">
						<span>from</span>
						<span class="text-4xl font-bold">$499</span>
						<span>/</span>
						<span>mo</span>
					</div>
					<button class="btn variant-filled-primary bg-primary-400 px-6 text-lg w-full my-3"
						>Upgrade to Business now</button
					>
					<div class="flex flex-col text-surface-900">
						<span class="font-semibold">Everything in Starter and:</span>
						<div class="flex flex-col gap-3 py-3">
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Credential Verification</span
							>
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Create 10 Credentials</span
							>
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Email Support</span
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

				<div
					class="rounded border border-tertiary-200 shadow-lg hover:bg-gradient-to-b transition-transform duration-500 hover:translate-y-2 hover:scale-105 hover:border-0 from-primary-100 to-white flex flex-col gap-3 p-6 items-start"
				>
					<span class="text-3xl font-semibold text-primary-500">Custom </span>
					<p class="text-tertiary-700">Get a hands-On experience of caas with Splash</p>
					<div class="h-px w-full bg-tertiary-300"></div>
					<div class="flex gap-2 items-end text-tertiary-900 py-3">
						<span class="text-4xl font-bold">Talk to us</span>
					</div>
					<button class="btn variant-filled-primary px-6 text-lg w-full my-3 bg-primary-400"
						>Contact Us</button
					>
					<div class="flex flex-col text-surface-900">
						<span class="font-semibold">Everything in Business and:</span>
						<div class="flex flex-col gap-3 py-3">
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Credential Verification</span
							>
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Create 10 Credentials</span
							>
							<span class="flex gap-1 items-center"
								><CheckIcon class="text-success-400" />Email Support</span
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
		</div>
	</div>
</div>
