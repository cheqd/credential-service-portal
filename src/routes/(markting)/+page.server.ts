import { isSvelteKitRedirect } from '$lib/helpers';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ url, locals }) => {
		const uri = new URL('/logto/callback', url.href);
		console.log('uri', uri);
		try {
			await locals.logto.signIn(uri.toString(), 'signUp');
		} catch (err) {
			if (isSvelteKitRedirect(err)) {
				return {
					location: err.location
				};
			}

			console.error('error in login action: ', err);
			return fail(400, {
				error: 'error performing signin with LogTo'
			});
		}
	},
	signin: async ({ url, locals }) => {
		const uri = new URL('/logto/callback', url.href);
		try {
			await locals.logto.signIn(uri.toString(), 'signIn');
		} catch (err) {
			if (isSvelteKitRedirect(err)) {
				return {
					location: err.location
				};
			}

			console.error('error in login action: ', err);
			return fail(400, {
				error: 'error performing signin with LogTo'
			});
		}
	}
};
