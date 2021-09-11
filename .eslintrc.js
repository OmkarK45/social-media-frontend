module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'next'],
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
			'warn',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: false },
		],
	},
}
