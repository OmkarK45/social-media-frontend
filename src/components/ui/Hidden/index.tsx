import { ReactNode } from 'react'

const VisuallyHidden = ({ children }: { children: ReactNode }) => {
	return (
		<span
			className="absolute border-0 h-px w-px -m-px p-0 overflow-hidden whitespace-nowrap"
			style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
		>
			{children}
		</span>
	)
}

export default VisuallyHidden
