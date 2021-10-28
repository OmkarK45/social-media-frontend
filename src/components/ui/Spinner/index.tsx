import LoadingIcon from './LoadingIcon'
import clsx from 'clsx'
import VisuallyHidden from '../Hidden'

interface Props {
	className?: string
	label?: string
}

const Spinner = ({ className = 'w-5 h-5', label = 'Loading...' }: Props) => {
	return (
		<div className="flex items-center justify-center h-full" role="status">
			<LoadingIcon className={clsx('animate-spin', className)} />
			<VisuallyHidden>{label}</VisuallyHidden>
		</div>
	)
}

export default Spinner
