<script lang="ts">
	import CheckIcon from '$lib/icons/checkIcon.svelte';
</script>

<div class=" h-full w-full flex flex-col gap-9">
	<div class="flex flex-col gap-6 p-9">
		<span class="text-3xl tracking-wide font-semibold">Plan & Billing</span>
		<div class=" rounded-lg border border-tertiary-300 p-6 flex flex-col gap-5">
			<span class="text-4xl text-primary-500/80 tracking-wide font-semibold"
				>My Plan: Free Trial</span
			>
			<p class="text-tertiary-600">
				Try our features for free with a 14-day trial on our testing environment and assess whether
				they meet your requirements.
			</p>
			<div class="flex flex-col gap-2">
				<div class="grid grid-cols-4 space-x-6 text-tertiary-700">
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
				<div class="grid grid-cols-4 space-x-6 text-tertiary-700">
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
		<div class="flex flex-col gap-2">
			<span class="text-3xl tracking-wide font-semibold">All Plans</span>
			<p class=" text-tertiary-600">Simple and transparent pricing that grows with you.</p>
		</div>
		<div class="grid grid-cols-3 place-content-center gap-3">
			<div class="rounded bg-gradient-to-b from-primary-100 to-white flex flex-col gap-3 p-6">
				<span class="text-3xl font-semibold text-primary-500">Free Trial</span>
				<p class="text-tertiary-700">Get a hands-On experience of caas with Splash</p>
				<div class="h-px w-full bg-tertiary-300"></div>
			</div>
		</div>
	</div>
</div>
