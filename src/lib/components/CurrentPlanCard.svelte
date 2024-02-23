<script lang="ts">
	import CheckIcon from '$lib/icons/checkIcon.svelte';
</script>

<div class="flex flex-col gap-3">
	<span class="text-3xl tracking-wide font-semibold">Plan & Billing</span>
	<div class=" rounded-lg border border-tertiary-300 p-6 flex flex-col gap-5 animated-bg">
		<span class="text-4xl text-primary-500/80 tracking-wide font-semibold">My Plan: Free Trial</span
		>
		<p class="text-tertiary-900">
			Try our features for free with a 14-day trial on our testing environment and assess whether
			they meet your requirements.
		</p>
		<div class="flex flex-col lg:gap-2">
			<div class="flex flex-col lg:grid grid-cols-4 gap-3 lg:space-x-6 text-tertiary-900">
				<span class="flex gap-1 items-center"
					><CheckIcon class="text-success-400" />1 organization</span
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
			<div class="flex flex-col gap-3 lg:grid grid-cols-4 lg:space-x-6 text-tertiary-900">
				<span class="flex gap-1 items-center"
					><CheckIcon class="text-success-400" />Credential template design</span
				>
				<span class="flex gap-1 items-center"
					><CheckIcon class="text-success-400" />Test Environment</span
				>
				<span class="flex gap-1 items-center"><CheckIcon class="text-success-400" />API access</span
				>
			</div>
		</div>
	</div>
</div>
