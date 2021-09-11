import { Card } from '../Card'
import GradientBar from '../GradientBar'
import Spinner from '../Spinner'

export function LoadingFallback() {
	return (
		<Card
			rounded="lg"
			className="dark:bg-gray-700 bg-gray-400  overflow-hidden"
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
	)
}
