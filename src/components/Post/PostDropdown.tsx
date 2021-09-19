import { HiFlag, HiOutlineDotsVertical, HiPencil } from 'react-icons/hi'
import { useState } from 'react'
import { Menu, MenuItem } from '../ui/Dropdown'
import { EditPost } from './EditPostModal'

interface Props {
	id: string
	caption: string
	isMine: boolean
}

export function PostDropdown({ id, caption, isMine }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<>
			<EditPost
				id={id}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				caption={caption}
			/>
			<Menu
				dropdown={
					<>
						{isMine && (
							<MenuItem icon={<HiPencil />} onClick={() => setIsOpen(true)}>
								Edit
							</MenuItem>
						)}

						<MenuItem icon={<HiFlag />}>Report Post</MenuItem>
					</>
				}
			>
				<span className="-m-2 p-2 rounded-full flex items-center dark:hover:bg-gray-700 hover:bg-gray-300">
					<HiOutlineDotsVertical className="w-5 h-5" />
				</span>
			</Menu>
		</>
	)
}
