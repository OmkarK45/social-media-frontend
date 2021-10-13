import { FeedbackFish } from '@feedback-fish/react'

export function Footer() {
	return (
		<div className="mt-2 text-center text-sm text-muted">
			<p>&copy; DogeSocial, 2021</p>
			<div className="flex space-x-2 justify-center mt-2">
				<div>
					<a
						className="no-underline text-muted"
						target="_blank"
						href="https://twitter.com/omkar_k45"
					>
						Twitter
					</a>
				</div>
				<div>
					<a
						className="no-underline text-muted"
						target="_blank"
						href="https://twitter.com/omkar_k45"
					>
						Hire Me
					</a>
				</div>
				<div>
					<a
						className="no-underline text-muted"
						target="_blank"
						href="https://github.com/omkark45"
					>
						GitHub
					</a>
				</div>
				<div>
					<FeedbackFish projectId="50ebf01f9a3ed3">
						<p className="cursor-pointer">Feedback</p>
					</FeedbackFish>
				</div>
			</div>
		</div>
	)
}
