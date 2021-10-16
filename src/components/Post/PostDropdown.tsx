import {
	HiOutlineDotsVertical,
	HiOutlineFlag,
	HiOutlinePencil,
	HiOutlineTrash,
} from 'react-icons/hi'
import { useState } from 'react'
import { Menu, MenuItem } from '../ui/Dropdown'
import { EditPost } from './EditPostModal'
import { DeletePostModal } from './DeletePostModal'

interface Props {
	id: string
	caption: string
	isMine: boolean
	gifLink: string
}

export function PostDropdown({ id, caption, isMine, gifLink }: Props) {
	const [editPostModal, setEditPostModal] = useState<boolean>(false)
	const [deletePostModal, setDeletePostModal] = useState<boolean>(false)
	return (
		<>
			<EditPost
				id={id}
				isOpen={editPostModal}
				onClose={() => setEditPostModal(false)}
				caption={caption}
				gifLink={gifLink}
			/>
			<DeletePostModal
				isOpen={deletePostModal}
				onClose={() => setDeletePostModal(false)}
				id={id}
			/>
			<Menu
				dropdown={
					<>
						{isMine && (
							<MenuItem
								icon={<HiOutlinePencil />}
								onClick={() => setEditPostModal(true)}
							>
								Edit
							</MenuItem>
						)}

						{isMine && (
							<MenuItem
								onClick={() => setDeletePostModal(true)}
								icon={<HiOutlineTrash />}
							>
								Delete Post
							</MenuItem>
						)}

						<MenuItem icon={<HiOutlineFlag />}>Report Post</MenuItem>
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
