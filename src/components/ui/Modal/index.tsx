import { createContext, Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalFooter from './ModalFooter'
import { useContext } from 'react'
import clsx from 'clsx'
import { GradientBar } from '../GradientBar'

export interface Props {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	className?: string
}

interface ModalContextType extends Omit<Props, 'children'> {}

export const ModalContext = createContext<ModalContextType | null>(null)

const Modal = ({ isOpen, onClose, children, className }: Props) => {
	return (
		<ModalContext.Provider value={{ isOpen, onClose }}>
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed z-10 inset-0 overflow-y-auto"
					onClose={onClose}
				>
					<div className="flex  justify-center md:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0 scale-125"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-100"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-125"
						>
							<div
								className={clsx(
									'inline-block w-full bg-white sm:my-8 dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all  lg:align-top sm:max-w-lg sm:w-full ',
									className
								)}
							>
								<GradientBar color="pink" size="md" />
								<div className="px-4 pt-5 pb-4  sm:p-6">{children}</div>
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

export function useModal() {
	return useContext(ModalContext)
}
