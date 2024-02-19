import { join } from 'path';
import type { Config } from 'tailwindcss';
import { CustomTheme } from './theme';

import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			themes: {
				custom: [CustomTheme]
			}
		})
	]
} satisfies Config;

export default config;
