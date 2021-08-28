import { useState, useEffect } from 'react'

export enum MEDIA_QUERIES {
	SMALL = '(min-width: 640px)',
	MEDIUM = '(min-width: 768px)',
	LARGE = '(min-width: 1024px)',
	XL = '(min-width: 1280px)',
}

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)

		if (media.matches !== matches) {
			setMatches(media.matches)
		}

		const listener = () => {
			setMatches(media.matches)
		}

		media.addEventListener('change', listener)
		return () => media.removeEventListener('change', listener)
	}, [matches, query])

	return matches
}

export default useMediaQuery
