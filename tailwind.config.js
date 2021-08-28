const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const brandColor = colors.blue

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig }
 **/
module.exports = {
	mode: 'jit',
	darkMode: 'class',
	purge: ['./src/**/*.{js,ts,jsx,tsx}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				gray: colors.gray,
				brand: brandColor,
			},
			ringColor: {
				DEFAULT: brandColor['500'],
			},
		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
}
