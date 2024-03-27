import type { ModalSettings } from '@skeletonlabs/skeleton';
import ErrorDialog from './ErrorDialog.svelte';

export const getErrorDialog = (
	errorMessage: string,
	enableRetry: boolean = false,
	title = 'There was an Error',
	handleSuccess?: () => void,
	handleClose?: () => void
) => {
	return {
		type: 'component',
		component: {
			ref: ErrorDialog,
			props: {
				enableRetry,
				title,
				handleSuccess,
				handleClose,
				errorMessage,
				confirmButtonLabel: 'Retry'
			}
		}
	} satisfies ModalSettings;
};
