import React from 'react'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Footer } from '../Common/Footer'
import { GradientBar } from '../ui/GradientBar'

interface Props {
	title: string
	subtitle: string
	children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: Props) {
	return (
		<main className="flex flex-col justify-center mx-auto w-full max-w-xl min-h-screen py-10">
			<div className="mb-8 text-center">
				<div className="inline-flex items-center mb-1 space-x-3">
					<svg
						className="hi-solid hi-cube-transparent inline-block w-10 h-10 text-brand-500"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
							clipRule="evenodd"
						/>
					</svg>
					<Heading size="h2">{title}</Heading>
				</div>
				<p className="mt-3 text-gray-500">{subtitle}</p>
			</div>
			<Card
				rounded="md"
				className="overflow-hidden sm:mx-auto sm:w-full sm:max-w-md"
			>
				<GradientBar color="indigo" />
				<Card.Body className="py-5">
					<div>{children}</div>
				</Card.Body>
			</Card>
			<Footer />
		</main>
	)
}
