<script lang="ts">
	import { goto } from '$app/navigation';
	import BenefitsCard from '$lib/components/BenefitsCard.svelte';
	import Header from '$lib/components/header.svelte';
	import CheqdIcon from '$lib/icons/CheqdIcon.svelte';
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex flex-col w-full pt-4 animated-bg">
		<Header />
		<div class="relative flex items-center justify-center px-8 min-h-[400px]">
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
	</div>

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

	<div class="flex w-full flex-wrap justify-center px-6 md:px-10 gap-8 mb-10">
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

	<div
		class="relative flex items-center justify-center bg-[#fff3ed] p-8 max-h-[400px] mx-8 lg:mx-20 rounded-3xl mt-10 shadow-lg"
	>
		<div class=" flex flex-col items-center md:items-start space-y-4 text-center md:text-start">
			<div class="uppercase items-center flex space-x-2 text-primary-400">
				<span>Get in touch </span>
				<span class="text-black h-[0.8px] w-20 bg-black hidden md:block"></span>
			</div>
			<div class="flex space-x-2 md:flex-row md:text-4xl lg:text-3xl text-2xl">
				<span class="font-semibold text-black">Get</span>
				<span class="font-semibold text-primary-500">started</span>
			</div>

			<p class="max-w-xl font-light">
				If you’re an SSI Vendor, Consultancy, Enterprise, Government agency, or Web3 company please
				contact us for a discovery call so we can learn about your use-case, problem statements, and
				get you set up with cheqd.
			</p>

			<div class="w-full flex justify-center md:justify-start">
				<button
					on:click={() => {
						window.open('https://cheqd.io/contact/', '_blank');
					}}
					class="z-20 btn bg-gradient-to-r from-primary-500 to-primary-400 text-white text-xl rounded-3xl flex py-4"
				>
					<span>Contact us &#8599;</span>
				</button>
			</div>

			<img
				src="/trust-triangle.png"
				class="absolute top-0 z-10 w-96 h-96 object-cover md:opacity-0 opacity-30 overflow-hidden"
				alt=""
			/>
		</div>

		<img
			src="/trust-triangle.png"
			class="lg:w-1/2 object-cover max-h-[400px] w-[40%] hidden md:block"
			alt=""
		/>
	</div>

	<div
		class="flex flex-col space-y-8 justify-end -mt-40 bg-gradient-to-r from-primary-50 to-[#e8ebf4] h-80 px-8 lg:px-20 pb-8"
	>
		<div class="w-full h-[0.8px] bg-gray-400"></div>
		<div
			class="w-full flex flex-col items-center lg:flex-row lg:justify-between text-lg font-light"
		>
			<p><span class="text-primary-400">@cheqd</span> 2024.All rights reserved.</p>
			<a target="_blank" rel="noopener noreferrer" href="https://cheqd.io/privacy-policy/"
				>Privacy Policy</a
			>
		</div>
	</div>
</div>
