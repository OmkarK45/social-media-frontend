import { ReactNode } from 'react'

interface ModalFooterProps {
	children: ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => {
	return (
		<footer className="flex items-center justify-end border-t border-gray-200 -mx-3 px-3">
			{children}
		</footer>
	)
}

export default ModalFooter
