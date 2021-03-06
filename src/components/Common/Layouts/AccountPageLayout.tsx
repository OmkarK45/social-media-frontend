import React from 'react'
import {
	HiOutlineKey,
	HiOutlineSparkles,
	HiOutlineUserCircle,
} from 'react-icons/hi'

import { EditProfileTab } from '~/components/Profile/EditProfileTab'
import { PasswordTab } from '~/components/Profile/Password'
import { Preferences } from '~/components/Profile/Preferences'
import { TabbedLayout } from '../Navbar/TabbedLayout'

export function AccountPageLayout() {
	return (
		<div className="max-w-7xl mt-20 mx-auto">
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				<TabbedLayout
					navigation={[
						{
							component: <EditProfileTab />,
							icon: HiOutlineUserCircle,
							name: 'Profile Settings',
							id: '',
						},
						{
							component: <PasswordTab />,
							icon: HiOutlineKey,
							name: 'Security Settings',
							id: '',
						},
						{
							component: <Preferences />,
							icon: HiOutlineSparkles,
							name: 'Preferences',
							id: '',
						},
					]}
					isTabbed={true}
				/>
			</div>
		</div>
	)
}
