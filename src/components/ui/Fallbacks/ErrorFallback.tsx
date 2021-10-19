import { ReactElement } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Button } from '~/components/ui/Button'

export interface Props {
	action?(): void
	message?: string
	icon?: ReactElement
	buttonText?: string
	noAction?: boolean
}

export const ErrorFallback = ({
	action,
	icon,
	message,
	buttonText = 'Try again.',
	noAction,
}: Props) => {
	return (
		<div className="flex flex-1 flex-col justify-center items-center space-y-4 my-12">
			{icon ? icon : <HiOutlineSparkles className="h-12 w-12 text-gray-500" />}
			<p className="font-medium text-gray-500">
				{message ? message : 'Something went wrong.'}
			</p>

			{!noAction ? (
				<Button className="text-sm" rounded="md" onClick={action}>
					{buttonText}
				</Button>
			) : null}
		</div>
	)
}
