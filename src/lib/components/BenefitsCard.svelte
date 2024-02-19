<script lang="ts">
	export let number: string;
	export let title: string;
	export let description: string;
</script>

<div
	class="rounded-xl p-8 flex flex-col bg-slate-[#f8f9fa] shadow-lg max-w-96 gap-3 hover:bg-primary-500/90 transition-all hover:text-white"
>
	<span class="text-5xl font-semibold text-gray-400">{number}</span>
	<span class="font-semibold text-xl">{title}</span>
	<span class="font-light">{description}</span>
</div>
