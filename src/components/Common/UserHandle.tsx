import { User } from '~/__generated__/schema.generated'
import { Link } from '../ui/Link'
import Image from 'next/image'

interface UserHandleProps {
	user: Partial<User>
}

export function UserHandle({ user }: UserHandleProps) {
	return (
		<>
			<div className="flex-shrink-0">
				<Image
					className="h-10 w-10 rounded-full"
					src={user.avatar!}
					width="40px"
					height="40px"
					alt=""
				/>
			</div>
			<div className="flex-1 min-w-0">
				<Link className="no-underline" href={`/profile/${user.username}`}>
					<p className="text-sm font-medium  truncate">
						{user.firstName + ' ' + user.lastName ? user.lastName : ''}
						OK
					</p>
					<p className="text-sm text-gray-500 truncate">
						{'@' + user.username}
					</p>
					<p className="text-sm truncate pt-1">{user.bio ? user.bio : ''}</p>
				</Link>
			</div>
		</>
	)
}
