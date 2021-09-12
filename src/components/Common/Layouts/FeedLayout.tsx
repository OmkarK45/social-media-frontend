import React from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { Feed } from '~/components/Feed'
import { RightSidebar } from '../Navbar/RightSidebar'
import { TabbedLayout } from '../Navbar/TabbedLayout'

export function FeedLayout() {
	return (
		<div className="py-10">
			<div className="max-w-3xl border border-white mx-auto sm:px-6 lg:max-w-[90rem] lg:grid lg:grid-cols-12 lg:gap-8">
				<div className="lg:col-span-9 lg:grid lg:grid-cols-12 lg:gap-8 border border-red-500">
					<TabbedLayout
						isTabbed={true}
						navigation={[
							{
								component: <Feed />,
								icon: HiOutlineHome,
								name: 'Your Feed',
							},
						]}
					/>
				</div>
				<div className="lg:col-span-3">
					<RightSidebar />
				</div>
			</div>
		</div>
	)
}
