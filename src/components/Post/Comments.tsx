import { Button } from '../ui/Button'
import { Heading } from '../ui/Heading'
import { TextArea } from '../ui/TextArea'

const people = [
	{
		name: 'Leonard Krasner',
		handle: 'leonardkrasner',
		imageUrl:
			'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Floyd Miles',
		handle: 'floydmiles',
		imageUrl:
			'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Emily Selman',
		handle: 'emilyselman',
		imageUrl:
			'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Kristin Watson',
		handle: 'kristinwatson',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Kristin Watson',
		handle: 'kristinwatson',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Kristin Watson',
		handle: 'kristinwatson',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
]

export function Comments() {
	return (
		<div className="bg-gray-800  max-h-[91vh] overflow-y-scroll">
			<div className="relative">
				<div className="flow-root h-full ">
					<div className="py-3 px-4 border-b border-gray-500">
						<Heading size="h5">Comments (50)</Heading>
					</div>
					<ul role="list" className="divide-y divide-gray-600 pb-16 ">
						{people.map((person) => (
							<li key={person.handle} className="py-4 px-4">
								<div className="flex items-center  space-x-4">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src={person.imageUrl}
											alt=""
										/>
									</div>
									<div className=" flex w-full justify-between">
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium  truncate">
												{person.name}
											</p>
											<p className="text-xs text-gray-500 truncate">
												{'@' + person.handle}
											</p>
										</div>
										<div>
											<time className="flex-shrink-0 flex-1 whitespace-nowrap text-xs text-gray-500">
												1d ago
											</time>
										</div>
									</div>
								</div>
								<div className="mt-2">
									<p className="text-sm dark:text-gray-300 ">
										I just started a new Tailwind CSS based project and I find
										it very refreshing. Could you suggest any tools to help me o
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="border border-red-700 mt-2 w-full absolute bottom-0 bg-gray-800 py-4">
				<input className="py-2 ml-3 mr-2 w-2/3" />
				<Button>Send</Button>
			</div>
		</div>
	)
}
