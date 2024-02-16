<script lang="ts">
	import { goto } from '$app/navigation';
	let playback = 0.5;
	import ArrowIcon from '$lib/icons/arrowIcon.svelte';
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex justify-between items-start w-full h-1/2 min-h-[690px] relative overflow-hidden">
		<div
			class="flex flex-col gap-6 p-9 items-start justify-center text-start lg:w-1/2 h-full mx-20 my-14"
		>
			<div class="flex flex-col">
				<div class="flex gap-3 text-6xl">
					<span class="font-semibold text-black">Credentials for </span>
					<span class="font-semibold text-primary-400">Everyone</span>
				</div>
				<div class="flex gap-3 text-6xl">
					<span class="font-semibold text-black">with </span>
					<span class="font-semibold text-primary-400">caas</span>
				</div>
			</div>

			<p class="max-w-xl text-tertiary-800 text-2xl">
				Exchange and monetise Trusted Data that is verifiable, portable, and privacy-preserving.
			</p>

			<div class="w-full flex gap-9 items-baseline">
				<button on:click={() => goto('/signin')} class=" btn variant-filled-primary bg-primary-400 text-xl w-1/3 h-14"
					>Get Started
				</button>
				<div class=" flex flex-col">
					<div class="flex gap-1 items-center">
						<a class="text-lg text-tertiary-800" href="/">Learn more</a>
						<ArrowIcon class="text-tertiary-800" />
					</div>
					<div class="w-28 h-1 bg-gradient-to-r from-primary-300 to-warning-300 rounded"></div>
				</div>
			</div>
		</div>

		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			class="hidden lg:flex"
			autoplay
			bind:playbackRate={playback}
			loop
			height="50%"
			width="50%"
			preload="auto"
		>
			<source src="/mobius.mp4" type="video/mp4" />
			<track kind="caption" />
		</video>

		<!-- asset with a transparent background -->
		<img
			src="/asset.png"
			class="w-1/2 rounded-lg border border-tertiary-200 shadow-lg absolute bottom-10 right-0"
			alt=""
		/>
	</div>

	<div class="h-screen bg-gradient-to-br from-primary-100 via-secondary-100 to-white"></div>
</div>
