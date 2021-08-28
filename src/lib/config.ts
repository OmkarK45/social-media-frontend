const APP_ENV = process.env.APP_ENV

const PROD_API = process.env.PROD_API

let env: 'production' | 'development'

if (APP_ENV) {
	env = APP_ENV as 'production' | 'development'
} else {
	const hostname = typeof window !== 'undefined' && window?.location?.hostname
	if (hostname) {
		if (hostname.includes('dogesocial')) {
			env = 'production'
		} else {
			env = 'development'
		}
	} else {
		env = 'development'
	}
}

export const IS_PRODUCTION = env === 'production'
export const IS_DEV = !IS_PRODUCTION

export const API_URL = IS_PRODUCTION
	? PROD_API
	: 'http://localhost:5000/graphql'
