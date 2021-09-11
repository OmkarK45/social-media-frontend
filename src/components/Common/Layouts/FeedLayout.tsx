import React from 'react'
import { RightSidebar } from '../Navbar/RightSidebar'

interface FeedLayoutProps {
	children: React.ReactNode
}

export function FeedLayout({ children }: FeedLayoutProps) {
	return (
		<div className="py-10">
			<div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
				<div className="hidden lg:block lg:col-span-3 xl:col-span-2">TODO</div>
				<main className="lg:col-span-9 xl:col-span-6">{children}</main>
				<RightSidebar />
			</div>
		</div>
	)
}
