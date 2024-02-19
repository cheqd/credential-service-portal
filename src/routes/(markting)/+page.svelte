<script lang="ts">
	import { goto } from '$app/navigation';
	import BenefitsCard from '$lib/components/BenefitsCard.svelte';
	import CheqdIcon from '$lib/icons/CheqdIcon.svelte';
</script>

<div class="w-full h-full flex flex-col px-4 mb-8">
	<div class="relative flex items-center justify-center">
		<div class=" flex flex-col items-center lg:gap-6 text-center">
			<div class="flex flex-col lg:flex-row lg:gap-3 lg:text-6xl text-3xl mt-10">
				<span class="font-bold text-black">Credential</span>
				<span class="font-bold text-primary-500">Service</span>
			</div>

			<p class="max-w-xl font-light lg:text-2xl my-4">
				The easiest and quickest way to start issuing credentials and getting paid
			</p>

			<div class="w-full flex justify-center">
				<button
					on:click={() => goto('/signin')}
					class=" btn variant-filled-primary bg-primary-500 text-xl w-[2/3] lg:w-1/3 lg:h-14 rounded-xl flex"
				>
					<CheqdIcon />
					<span>Get Started</span>
				</button>
			</div>

			<img
				src="/trust-triangle.png"
				class="absolute h-80 w-80 object-cover lg:opacity-0 opacity-50 -z-20"
				alt=""
			/>
		</div>

		<img src="/trust-triangle.png" class="w-1/2 hidden lg:block" alt="" />
	</div>

	<!-- <div class="h-screen bg-gradient-to-br from-primary-100 via-secondary-100 to-white"></div> -->
	<div class="flex flex-col w-full items-center mt-8">
		<p class="text-primary-500 text-sm uppercase">Issue digital credentials</p>

		<p class="text-4xl mb-8 text-center">
			What is credential <span class=" font-bold text-primary-500">service?</span>
		</p>

		<p class="text-center max-w-[650px] font-light text-xl">
			Credential Service is a collection of easily usable, production-ready APIs for issuing digital
			Credentials and building Trusted Data Markets.
		</p>
	</div>

	<div class="flex flex-col w-full items-center mt-8">
		<p class="text-primary-500 text-sm uppercase">Easy to get Started</p>

		<p class="text-4xl mb-8 font-semibold">Benefits</p>
	</div>

	<div class="flex w-full flex-wrap justify-center lg:px-20 gap-8">
		<BenefitsCard
			number={'01'}
			title="Profitability"
			description="New business model for issuers of Credentials, providing a new recurring revenue stream."
		/>

		<BenefitsCard
			number={'02'}
			title="Simplicity"
			description="Issue Credentials in a few clicks, or lines of code."
		/>

		<BenefitsCard
			number={'03'}
			title="Compliance"
			description="Meet regulatory requirements such as eIDAS 2.0."
		/>

		<BenefitsCard
			number={'04'}
			title="Scalability"
			description="Production-ready performance with over 5,000 transactions per second."
		/>
		<BenefitsCard
			number={'05'}
			title="Flexibility"
			description="Multiple options for custody and self-custody."
		/>
		<BenefitsCard
			number={'06'}
			title="Interoperability"
			description="Credentials are compatible with other industry leaders, based on W3C standards."
		/>
	</div>
</div>
