import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Spinner from '../ui/Spinner'

export function UserProfilePopover() {
	return (
		<Card
			rounded="lg"
			className="flex items-center min-w-md  shadow-lg bg-white justify-center  "
		>
			<div className="max-w-md py-6 px-6 dark:bg-gray-800 rounded">
				<img
					className="w-16 h-16 rounded-full shadow"
					src="https://github.com/sushilburagute.png"
					alt="profile"
				/>
				<p className="text-xl font-semibold leading-tight mt-2.5 text-gray-800 dark:text-gray-100">
					Sushil Buragute
				</p>
				<p className="text-sm leading-3 mt-2 text-muted dark:text-gray-400">
					@codetastic{' '}
				</p>
				<div className="mt-4 space-y-4">
					<div className="flex items-center">
						<div>
							<p className="text-xl font-semibold leading-tight text-muted">
								100,345
							</p>
							<p className="text-sm leading-3 mt-2 text-gray-500 dark:text-gray-400">
								Followers
							</p>
						</div>
						<div className="ml-11">
							<p className="text-xl font-semibold leading-tight  text-blue-600">
								1,765
							</p>
							<p className="text-sm leading-3 mt-2 text-gray-500 dark:text-gray-400">
								Posts
							</p>
						</div>
					</div>
					<Button fullWidth>View Profile</Button>
				</div>
				{/* <div className="mx-auto">
					<Spinner className="w-5 h-5" />
				</div> */}
			</div>
		</Card>
	)
}
