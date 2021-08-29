import { ReactElement } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Button } from '~/components/ui/Button'

interface Props {
	action(): void
	message?: string
	icon?: ReactElement
}

const ErrorFallback = ({ action, icon, message }: Props) => {
	return (
		<div className="flex flex-1 flex-col justify-center items-center space-y-4 my-12">
			{icon ? icon : <HiOutlineSparkles className="h-12 w-12 text-gray-500" />}
			<p className="font-medium text-gray-400">
				{message ? message : 'Something went wrong.'}
			</p>
			<Button className="text-sm" rounded="md" active onClick={action}>
				Try again
			</Button>
		</div>
	)
}

export default ErrorFallback
