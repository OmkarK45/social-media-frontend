import { Dialog } from '@headlessui/react'
import { useContext } from 'react'
import { CloseIcon } from '~/components/Assets/CloseIcon'
import { ModalContext } from '../index'
import Button from '../../Button'

interface ModalHeaderProps {
	title: string
	description: string
	dismiss?: boolean
}

const ModalHeader = ({
	title,
	description,
	dismiss = false,
}: ModalHeaderProps) => {
	const { onClose } = useContext(ModalContext)!
	if (!onClose) throw new Error('`ModalHeader` must be used within `Modal`')

	return (
		<header className="flex items-center justify-center space-x-8">
			<div className="flex-1 min-w-0">
				<Dialog.Title as="h3" className="text-lg uppercase font-bold truncate">
					{title}
				</Dialog.Title>
				<Dialog.Description
					as="h4"
					className="font-semibold text-sm text-gray-500"
				>
					{description}
				</Dialog.Description>
			</div>
			{dismiss && (
				<Button
					className="mb-auto p-2 -mt-1"
					rounded="md"
					aria-label="Close modal"
					onClick={onClose}
				>
					<CloseIcon className="w-5 h-5 text-black" />
				</Button>
			)}
		</header>
	)
}

export default ModalHeader
