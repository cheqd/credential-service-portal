import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const CustomTheme: CustomThemeConfig = {
	name: 'skeleton-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '255 255 255',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #FE5000
		'--color-primary-50': '255 229 217', // #ffe5d9
		'--color-primary-100': '255 220 204', // #ffdccc
		'--color-primary-200': '255 211 191', // #ffd3bf
		'--color-primary-300': '255 185 153', // #ffb999
		'--color-primary-400': '254 133 77', // #fe854d
		'--color-primary-500': '254 80 0', // #FE5000
		'--color-primary-600': '229 72 0', // #e54800
		'--color-primary-700': '191 60 0', // #bf3c00
		'--color-primary-800': '152 48 0', // #983000
		'--color-primary-900': '124 39 0', // #7c2700
		// secondary | #0075B0
		'--color-secondary-50': '217 234 243', // #d9eaf3
		'--color-secondary-100': '204 227 239', // #cce3ef
		'--color-secondary-200': '191 221 235', // #bfddeb
		'--color-secondary-300': '153 200 223', // #99c8df
		'--color-secondary-400': '77 158 200', // #4d9ec8
		'--color-secondary-500': '0 117 176', // #0075B0
		'--color-secondary-600': '0 105 158', // #00699e
		'--color-secondary-700': '0 88 132', // #005884
		'--color-secondary-800': '0 70 106', // #00466a
		'--color-secondary-900': '0 57 86', // #003956
		// tertiary | #97999B
		'--color-tertiary-50': '239 240 240', // #eff0f0
		'--color-tertiary-100': '234 235 235', // #eaebeb
		'--color-tertiary-200': '229 230 230', // #e5e6e6
		'--color-tertiary-300': '213 214 215', // #d5d6d7
		'--color-tertiary-400': '182 184 185', // #b6b8b9
		'--color-tertiary-500': '151 153 155', // #97999B
		'--color-tertiary-600': '136 138 140', // #888a8c
		'--color-tertiary-700': '113 115 116', // #717374
		'--color-tertiary-800': '91 92 93', // #5b5c5d
		'--color-tertiary-900': '74 75 76', // #4a4b4c
		// success | #007A33
		'--color-success-50': '217 235 224', // #d9ebe0
		'--color-success-100': '204 228 214', // #cce4d6
		'--color-success-200': '191 222 204', // #bfdecc
		'--color-success-300': '153 202 173', // #99caad
		'--color-success-400': '77 162 112', // #4da270
		'--color-success-500': '0 122 51', // #007A33
		'--color-success-600': '0 110 46', // #006e2e
		'--color-success-700': '0 92 38', // #005c26
		'--color-success-800': '0 73 31', // #00491f
		'--color-success-900': '0 60 25', // #003c19
		// warning | #F2A900
		'--color-warning-50': '253 242 217', // #fdf2d9
		'--color-warning-100': '252 238 204', // #fceecc
		'--color-warning-200': '252 234 191', // #fceabf
		'--color-warning-300': '250 221 153', // #fadd99
		'--color-warning-400': '246 195 77', // #f6c34d
		'--color-warning-500': '242 169 0', // #F2A900
		'--color-warning-600': '218 152 0', // #da9800
		'--color-warning-700': '182 127 0', // #b67f00
		'--color-warning-800': '145 101 0', // #916500
		'--color-warning-900': '119 83 0', // #775300
		// error | #A6192E
		'--color-error-50': '242 221 224', // #f2dde0
		'--color-error-100': '237 209 213', // #edd1d5
		'--color-error-200': '233 198 203', // #e9c6cb
		'--color-error-300': '219 163 171', // #dba3ab
		'--color-error-400': '193 94 109', // #c15e6d
		'--color-error-500': '166 25 46', // #A6192E
		'--color-error-600': '149 23 41', // #951729
		'--color-error-700': '125 19 35', // #7d1323
		'--color-error-800': '100 15 28', // #640f1c
		'--color-error-900': '81 12 23', // #510c17
		// surface | #ffffff
		'--color-surface-50': '255 255 255', // #ffffff
		'--color-surface-100': '255 255 255', // #ffffff
		'--color-surface-200': '255 255 255', // #ffffff
		'--color-surface-300': '255 255 255', // #ffffff
		'--color-surface-400': '255 255 255', // #ffffff
		'--color-surface-500': '255 255 255', // #ffffff
		'--color-surface-600': '230 230 230', // #e6e6e6
		'--color-surface-700': '191 191 191', // #bfbfbf
		'--color-surface-800': '153 153 153', // #999999
		'--color-surface-900': '125 125 125' // #7d7d7d
	}
};
