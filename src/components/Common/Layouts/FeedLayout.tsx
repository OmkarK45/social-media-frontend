// eslint-disable-file  react/display-name
import React from 'react'
import dynamic from 'next/dynamic'
import { HiOutlineFire, HiOutlineHashtag, HiOutlineHome } from 'react-icons/hi'
import { Feed } from '~/components/Feed'
import { Hashtags } from '~/components/Hashtags/Hashtags'
import { TabbedLayout } from '../Navbar/TabbedLayout'
import { LoadingFallback } from '~/components/ui/Fallbacks/LoadingFallback'
import { CurrentUser } from '~/components/User/CurrentUser'
import { useUser } from '~/utils/useUser'
import Spinner from '~/components/ui/Spinner'
import { PopularPostsFeed } from '~/components/Feed/PopularPosts'
import { IndeterminateProgress } from '~/components/ui/Progress'

const RightSidebar = dynamic<{}>(
	async () => {
		const { RightSidebar } = await import('../Navbar/RightSidebar')
		return RightSidebar
	},
	// eslint-disable-next-line react/display-name
	{ loading: () => <LoadingFallback />, ssr: true }
)

RightSidebar.displayName = 'RightSidebar'

export const navigation = [
	{
		component: <Feed />,
		icon: HiOutlineHome,
		name: 'Your Feed',
		id: 'all',
	},
	{
		component: <PopularPostsFeed />,
		icon: HiOutlineFire,
		name: 'Popular',
		id: 'popular',
	},
	{
		component: <Hashtags />,
		icon: HiOutlineHashtag,
		name: 'Trending',
		id: 'trending',
	},
]

export function FeedLayout() {
	const { user, loading } = useUser()
	if (loading || !user)
		return (
			<div className="mt-[74px]">
				<IndeterminateProgress />
			</div>
		)
	return (
		<div className="py-20">
			<div className="max-w-3xl  mx-auto sm:px-6 lg:max-w-full xl:max-w-[90rem] lg:grid lg:grid-cols-12 lg:gap-8">
				<div className="lg:col-span-9 lg:grid lg:grid-cols-12 lg:gap-8 ">
					<TabbedLayout isTabbed={true} navigation={navigation} />
					<div className="hidden lg:block fixed bottom-8">
						<CurrentUser
							avatar={user.avatar}
							firstName={user.firstName}
							username={user.username}
						/>
					</div>
				</div>
				<div className="hidden lg:block lg:col-span-3">
					<RightSidebar />
				</div>
			</div>
		</div>
	)
}
