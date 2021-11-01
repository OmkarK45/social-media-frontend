/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'next',
		'next/core-web-vitals',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'no-unused-vars': [
			'off',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: false },
		],
		'react-hooks/exhaustive-deps': 'off',
		'@next/next/no-img-element': 'off',
	},
	globals: {
		NodeJS: true,
	},
}
