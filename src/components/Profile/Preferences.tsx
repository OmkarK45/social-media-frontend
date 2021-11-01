import { ThemeToggle } from '../ThemeSwitcher'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'

export function Preferences() {
	return (
		<Card rounded="lg" className="lg:max-w-3xl">
			<Card.Body>
				<Heading size="h3">Preferences</Heading>
				<p className="text-muted text-sm">
					Adjust these setting according to your needs. Such as Dark Mode.
				</p>

				<div className="container pt-5 space-y-6 mx-auto">
					<div className="flex items-center justify-between">
						<span className="flex-grow flex flex-col">
							<label className="text-sm font-medium dark:text-white text-gray-900">
								Dark Mode
							</label>
							<span className="text-sm text-muted">
								Change to light or dark mode.
							</span>
						</span>
						<ThemeToggle />
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}
