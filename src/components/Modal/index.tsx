import { createContext, ReactNode } from 'react'
import { Dialog } from '@headlessui/react'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalFooter from './ModalFooter'

export interface Props {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

interface ModalContextType extends Omit<Props, 'children'> {}

export const ModalContext = createContext<ModalContextType | null>(null)

const Modal = ({ isOpen, onClose, children }: Props) => {
	return (
		<ModalContext.Provider value={{ isOpen, onClose }}>
			<Dialog
				className="z-50 fixed inset-0 flex items-center justify-center"
				open={isOpen}
				onClose={onClose}
			>
				<Dialog.Overlay className="absolute inset-0 bg-black opacity-25" />
				<section className="relative flex flex-col max-w-2xl px-3 py-4 space-y-6 shadow-xl bg-white rounded-md text-black">
					{children}
				</section>
			</Dialog>
		</ModalContext.Provider>
	)
}

Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter

export default Modal
