import { useState } from 'react'
import {
	HiOutlineDotsVertical,
	HiOutlineFlag,
	HiOutlinePencil,
	HiOutlineTrash,
} from 'react-icons/hi'
import { Menu, MenuItem } from '../ui/Dropdown'
import { DeleteCommentModal } from './DeleteCommentModal'
import { EditCommentModal } from './EditCommentModal'

interface Props {
	id: string
	isMine: boolean
	postId: string
	body: string
}

export function CommentDropdown({ id, isMine, postId, body }: Props) {
	const [editCommentModal, setEditCommentModal] = useState<boolean>(false)
	const [deleteCommentModal, setDeleteCommentModal] = useState<boolean>(false)

	return (
		<>
			<EditCommentModal
				body={body}
				id={id}
				postId={postId}
				isOpen={editCommentModal}
				onClose={() => setEditCommentModal(false)}
			/>
			<DeleteCommentModal
				id={id}
				postId={postId}
				isOpen={deleteCommentModal}
				onClose={() => setDeleteCommentModal(false)}
			/>
			<Menu
				dropdown={
					<>
						{isMine && (
							<MenuItem
								icon={<HiOutlinePencil />}
								onClick={() => setEditCommentModal(true)}
							>
								Edit Comment
							</MenuItem>
						)}
						{isMine && (
							<MenuItem
								icon={<HiOutlineTrash />}
								onClick={() => setDeleteCommentModal(true)}
							>
								Delete Comment
							</MenuItem>
						)}

						<MenuItem icon={<HiOutlineFlag />}>Report Comment</MenuItem>
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
