import { ReactNode } from 'react'

interface ModalContentProps {
	children: ReactNode
}

const ModalContent = ({ children }: ModalContentProps) => {
	return <div className="flex flex-col justify-center">{children}</div>
}

export default ModalContent
