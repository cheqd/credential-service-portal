<script lang="ts">
	export let number: string;
	export let title: string;
	export let description: string;
</script>

<div
	class="lg:rounded-3xl rounded-2xl p-8 flex flex-col border border-gray-200 bg-[#f8f9fa] shadow-2xl lg:max-w-96 md:h-64 lg:h-72 w-full gap-3 hover:bg-primary-500/90 transition-all hover:text-white"
>
	<span class="text-6xl font-semibold text-gray-400">{number}</span>
	<span class="text-3xl lg:text-2xl">{title}</span>
	<span class="font-light">{description}</span>
</div>
