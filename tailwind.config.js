const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const brandColor = colors.pink

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig }
 **/
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				gray: colors.trueGray,
				brand: brandColor,
			},
			ringColor: {
				DEFAULT: brandColor['500'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
}
