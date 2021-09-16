import { Dialog } from '@headlessui/react'
import { useContext } from 'react'
import { CloseIcon } from '~/components/ui/Assets/CloseIcon'
import { ModalContext } from '../index'
import { Button } from '../../Button'
import { ReactNode } from 'react'
interface ModalHeaderProps {
	title?: string
	description?: string
	dismiss?: boolean
	children?: ReactNode
}

const ModalHeader = ({
	title,
	description,
	dismiss = false,
	children,
}: ModalHeaderProps) => {
	const { onClose } = useContext(ModalContext)!
	if (!onClose) throw new Error('`ModalHeader` must be used within `Modal`')

	return (
		<header className="flex items-center justify-center space-x-8">
			<div className="flex-1 min-w-0">
				{!children && (
					<>
						{' '}
						<Dialog.Title>{title}</Dialog.Title>
						<Dialog.Description
							as="h4"
							className="font-semibold text-sm text-gray-500"
						>
							{description}
						</Dialog.Description>
					</>
				)}
				{children}
			</div>
			{dismiss && (
				<Button
					variant="dark"
					className="mb-auto -mt-1"
					rounded="md"
					aria-label="Close modal"
					onClick={onClose}
				>
					<CloseIcon className="w-5 h-5" />
				</Button>
			)}
		</header>
	)
}

export default ModalHeader
