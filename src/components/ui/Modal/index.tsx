import { createContext, Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
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
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed z-10 inset-0 overflow-y-auto overflow-hidden"
					open={isOpen}
					onClose={onClose}
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="transform opacity-0"
							enterTo="transform opacity-100"
							leave="transition ease-in duration-100"
							leaveFrom="transform opacity-100"
							leaveTo="transform opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-75 p-4 lg:p-8" />
						</Transition.Child>

						<Transition.Child
							as="div"
							enter="transition ease-out duration-200"
							enterFrom="transform opacity-0  scale-125"
							enterTo="transform  opacity-100 scale-100"
							leave="transition ease-in duration-100"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-125"
						>
							<div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
								<div className="sm:pt-3">{children}</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</ModalContext.Provider>
	)
}

Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter

export default Modal
