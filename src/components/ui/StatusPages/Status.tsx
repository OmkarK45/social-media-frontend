import { Button } from '../Button'

const status_code_to_msg: Record<
	string,
	{ error: string; description: string }
> = {
	404: {
		error: 'Page Not Found',
		description:
			'We are sorry but the page you are looking for was not found..',
	},
	500: {
		error: 'Internal Server Error',
		description: 'We are sorry but there was an internal server error.',
	},
	401: {
		error: 'Not Authorized',
		description:
			'We are sorry but you are not authorized to access this page..',
	},
	400: {
		error: 'Bad Request',
		description:
			'We are sorry but your request contains bad syntax and cannot be fulfilled..',
	},
}

interface StatusProps {
	statusCode: '404' | '401' | '400' | '500'
	href: string
}
export function Status({ statusCode, href }: StatusProps) {
	return (
		<div
			id="page-container"
			className="flex flex-col mx-auto w-full min-h-screen bg-gray-100 dark:bg-gray-800"
		>
			<main id="page-content" className="flex flex-auto flex-col max-w-full">
				<div className="bg-white dark:bg-gray-900 min-h-screen flex items-center relative overflow-hidden">
					<div className="absolute left-0 top-0 bottom-0 w-48 bg-brand-50 dark:bg-gray-800 transform skew-x-6 -ml-48 md:-ml-28"></div>
					<div className="absolute right-0 top-0 bottom-0 w-48 bg-brand-50 dark:bg-gray-800 transform skew-x-6 -mr-48 md:-mr-28"></div>

					<div className="text-center space-y-10 relative container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
						<div>
							<div className="text-6xl md:text-9xl font-extrabold mb-10 md:mb-20 inline-block relative">
								<div className="absolute inset-0 border-4 border-red-50 animate-ping"></div>
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-brand-500 relative">
									{statusCode}
								</span>
							</div>
							<h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-brand-500">
								{status_code_to_msg[statusCode].error}
							</h2>
							<h3 className="text-lg md:text-xl md:leading-relaxed font-medium lg:w-2/3 text-brand-400 mx-auto">
								{status_code_to_msg[statusCode].description}
							</h3>
						</div>
						<Button href={href}>Back to Home</Button>
					</div>
				</div>
			</main>
		</div>
	)
}
