import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
	const client = useApolloClient()
	const router = useRouter()

	return () => {
		// Once the auth state has changed, we know that the data in the Apollo store
		// is likely no longer relevant, so we reset the entire store.
		client.stop()
		client.resetStore()
		router.push((router.query.redirect as string) ?? '/')
	}
}
