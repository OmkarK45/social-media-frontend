import { forwardRef, LegacyRef } from 'react'
import { Card } from '../Card'
import { GradientBar } from '../GradientBar'
import Spinner from '../Spinner'

export const LoadingFallback = forwardRef<HTMLDivElement>((_, ref) => {
	console.log('LOADING CALLED')
	return (
		<div ref={ref}>
			<Card
				rounded="lg"
				className="dark:bg-gray-700 bg-gray-200 max-w-2xl overflow-hidden"
			>
				<Card.Body noPadding>
					<GradientBar color="pink" />
					<div className="px-4 py-3">
						<div className="flex flex-col items-center justify-center">
							<Spinner className="w-5 h-5 mb-1" />
							<p className="font-medium ">Loading...</p>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
})

LoadingFallback.displayName = 'LoadingFallback'
