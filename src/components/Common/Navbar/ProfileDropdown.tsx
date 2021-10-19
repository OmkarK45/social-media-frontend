import { useMutation, gql } from '@apollo/client'
import {
	HiOutlineCog,
	HiOutlineHome,
	HiOutlineLogout,
	HiOutlineSparkles,
} from 'react-icons/hi'
import { Avatar } from '~/components/ui/Avatar'
import { Menu, MenuItem } from '~/components/ui/Dropdown'
import { useAuthRedirect } from '~/utils/useAuthRedirect'
import { User } from '~/__generated__/schema.generated'

interface ProfileDropdownProps {
	user: Partial<User>
}

const LOGOUT_MUTATION = gql`
	mutation SignOutMutation {
		logout {
			success
		}
	}
`

export function ProfileDropdown({ user }: ProfileDropdownProps) {
	const authRedirect = useAuthRedirect()

	const [signout] = useMutation(LOGOUT_MUTATION, {
		onCompleted: () => {
			authRedirect()
		},
	})

	return (
		<Menu
			dropdown={
				<>
					<MenuItem href={'/feed'} icon={<HiOutlineHome className="w-5 h-5" />}>
						Home
					</MenuItem>
					<MenuItem
						href={`/profile/${user.username}`}
						icon={<HiOutlineSparkles className="w-5 h-5" />}
					>
						My Profile
					</MenuItem>
					<MenuItem
						href={`/account/settings`}
						icon={<HiOutlineCog className="w-5 h-5" />}
					>
						Profile settings
					</MenuItem>
					<MenuItem
						onClick={() => signout()}
						icon={<HiOutlineLogout className="w-5 h-5" />}
					>
						Signout
					</MenuItem>
				</>
			}
			dropdownClassName="mr-5 mt-6"
		>
			<Avatar rounded url={user.avatar!} />
		</Menu>
	)
}
