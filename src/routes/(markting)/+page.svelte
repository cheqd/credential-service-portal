<script lang="ts">
	import { goto } from '$app/navigation';
	import BenefitsCard from '$lib/components/BenefitsCard.svelte';
	import CheqdIcon from '$lib/icons/CheqdIcon.svelte';
</script>

<div class="w-full h-full flex flex-col mb-8">
	<div class="relative flex items-center justify-center animated-bg px-8 min-h-[400px]">
		<div class=" flex flex-col items-center md:items-start md:gap-6 text-center md:text-start">
			<div class="flex flex-col md:flex-row md:gap-3 md:text-4xl lg:text-6xl text-3xl mt-10">
				<span class="font-bold text-black">Credential</span>
				<span class="font-bold text-primary-500">Service</span>
			</div>

			<p class="max-w-xl md:font-light text-lg md:text-xl my-6">
				The easiest and quickest way to start issuing credentials and getting paid
			</p>

			<div class="w-full flex justify-center md:justify-start">
				<button
					on:click={() => goto('/signin')}
					class=" btn bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xl rounded-3xl flex py-4"
				>
					<CheqdIcon />
					<span>Get started</span>
				</button>
			</div>

			<img
				src="/trust-triangle.png"
				class="absolute h-80 w-80 object-cover md:opacity-0 opacity-30 -z-20"
				alt=""
			/>
		</div>

		<img src="/trust-triangle.png" class="lg:w-1/2 object-cover w-[45%] hidden md:block" alt="" />
	</div>

	<!-- <div class="h-screen bg-gradient-to-br from-primary-100 via-secondary-100 to-white"></div> -->
	<div class="flex flex-col w-full items-center mt-8 px-4">
		<p class="text-primary-500 text-sm uppercase">Issue digital credentials</p>

		<p class="text-2xl md:text-4xl mb-8 text-center">
			What is credential <span class=" font-bold text-primary-500">service?</span>
		</p>

		<p class="text-center max-w-[650px] font-light text-xl">
			Credential Service is a collection of easily usable, production-ready APIs for issuing digital
			Credentials and building Trusted Data Markets.
		</p>
	</div>

	<div class="flex flex-col w-full items-center mt-8 px-4">
		<p class="text-primary-500 text-sm uppercase">Easy to get Started</p>

		<p class="text-2xl md:text-4xl mb-8 font-semibold">Benefits</p>
	</div>

	<div class="flex w-full flex-wrap justify-center px-6 md:px-10 gap-8">
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
