<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	export let components: Record<string, ModalComponent>;
</script>

<Modal
	background="bg-surface-500"
	flyY={-1}
	flyOpacity={0}
	padding="px-6 py-6"
	spacing="space-y-9"
	rounded="rounded-xl"
	regionBackdrop="bg-white"
	regionHeader="text-2xl font-semibold text-surface-200 flex flex-col items-center"
	regionBody="text-surface-200 bg-red-900 "
	regionFooter="flex items-center justify-end gap-9"
	buttonPositive="btn variant-filled-primary tracking-wide !text-surface-700"
	buttonTextConfirm="Confirm"
	buttonNeutral=" btn variant-soft-tertiary text-surface-200"
	buttonTextCancel="Cancel"
	{components}
	on:touchend
	on:backdrop
	on:touchstart
/>
