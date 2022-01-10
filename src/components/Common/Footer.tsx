import { FeedbackFish } from '@feedback-fish/react'
import React, { useState } from 'react'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'
import {
	SiApollographql,
	SiGraphql,
	SiNextdotjs,
	SiPostgresql,
	SiReact,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si'
import { IconType } from 'react-icons/lib'
import { Button } from '../ui/Button'
import { HiHeart } from 'react-icons/hi'
import { Alert } from '../ui/Alert'

interface TechStackInfo {
	name: string
	url: string
	icon: IconType
	description: string
}
const buildUsingStack: Array<TechStackInfo> = [
	{
		name: 'Next.JS',
		url: 'https://nextjs.org/',
		icon: SiNextdotjs,
		description:
			'Next.js is a React framework for server-rendered applications.',
	},
	{
		name: 'TailwindCSS',
		url: 'https://tailwindcss.com/',
		icon: SiTailwindcss,
		description:
			'TailwindCSS is a utility-first CSS framework for rapidly building custom components.',
	},
	{
		name: 'TypeScript',
		url: 'https://www.typescriptlang.org/',
		icon: SiTypescript,
		description:
			'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
	},
	{
		name: 'Apollo GraphQL (Server + Client)',
		url: 'https://www.apollographql.com/',
		icon: SiApollographql,
		description:
			'Apollo is a GraphQL server and client library for Node.js, Express, and Hapi.js.',
	},
	{
		name: 'PostgreSQL',
		url: 'https://www.postgresql.org/',
		icon: SiPostgresql,
		description:
			'PostgreSQL is a powerful, open source object-relational database system.',
	},
	{
		name: 'GiraphQL',
		url: 'https://giraphql.com/',
		icon: SiGraphql,
		description:
			'GiraphQL - A plugin based GraphQL schema builder for typescript',
	},
]

export function Footer() {
	const [open, setOpen] = useState(false)

	return (
		<div className="mt-2 text-center text-sm text-muted">
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<Modal.Header dismiss>
					<div className="flex space-x-2">
						<Heading size="h3">Built using</Heading>
						<HiHeart className="text-red-700 w-10 h-10" />
					</div>
				</Modal.Header>
				<Modal.Content>
					<div className="flow-root mt-6">
						<ul
							role="list"
							className="-my-5 divide-y divide-gray-200 dark:divide-gray-600"
						>
							{buildUsingStack.map((stack) => {
								const Icon = stack.icon
								return (
									<li key={stack.url} className="py-4 ">
										<div className="flex items-center space-x-4 ">
											<div className="flex-shrink-0">
												<Icon className="w-8 h-8" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium truncate">
													{stack.name}
												</p>
												<p className="text-sm text-gray-500">
													{stack.description}
												</p>
											</div>
											<div>
												<Button href={stack.url} variant="dark" rounded="lg">
													Visit 🡥
												</Button>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
						<p className="text-sm text-gray-500 mt-4">
							Honourable mentions:
							<ul>
								<li>Prisma - Type Safe ORM for TypeScript </li>
								<li>React Hook Form - Form without tears </li>
								<li>ZOD - Schema validation for typescript</li>
								<li>Cloudinary - Image CDN Provider</li>
							</ul>
						</p>
					</div>
				</Modal.Content>
			</Modal>
			<p>&copy; DogeSocial, 2021</p>
			<div className="flex space-x-2 justify-center mt-2">
				<div>
					<a
						className="no-underline text-muted"
						target="_blank"
						rel="noreferrer"
						href="https://twitter.com/omkar_k45"
					>
						Twitter
					</a>
				</div>
				<div>
					<a
						className="no-underline text-muted"
						target="_blank"
						rel="noreferrer"
						href="https://twitter.com/omkar_k45"
					>
						Hire Me
					</a>
				</div>
				<div>
					<a
						className="no-underline text-muted"
						target="_blank"
						rel="noreferrer"
						href="https://github.com/omkark45"
					>
						GitHub
					</a>
				</div>
				<div>
					<button onClick={() => setOpen(true)}>Built Using</button>
				</div>
				<div>
					<FeedbackFish projectId="50ebf01f9a3ed3">
						<p className="cursor-pointer">Feedback</p>
					</FeedbackFish>
				</div>
			</div>
			<div className="mt-4 mx-auto">
				<Alert
					status="warning"
					message="Do not store any sensitive information. Any sensitive information will be lost."
				/>
			</div>
		</div>
	)
}
