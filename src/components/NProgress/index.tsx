import nprogress from 'nprogress'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function NProgress() {
	const router = useRouter()

	useEffect(() => {
		let timeout: NodeJS.Timeout

		function start() {
			clearTimeout(timeout)
			timeout = setTimeout(() => nprogress.start(), 100)
		}

		function done() {
			clearTimeout(timeout)
			nprogress.done()
		}

		router.events.on('routeChangeStart', start)
		router.events.on('routeChangeComplete', done)
		router.events.on('routeChangeError', done)
		return () => {
			done()
			router.events.off('routeChangeStart', start)
			router.events.off('routeChangeComplete', done)
			router.events.off('routeChangeError', done)
		}
	}, [router.events])

	return null
}
