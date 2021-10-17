import clsx from 'clsx'
import { forwardRef, ComponentProps } from 'react'
import { FieldError } from '../Form/Form'

interface Props extends ComponentProps<'textarea'> {
	label: string
	className?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
	function TextArea({ label, className, ...props }, ref) {
		return (
			<label>
				<div className="mb-1 font-medium dark:text-white ">{label}</div>
				<textarea
					className={clsx(
						'w-full transition duration-500 ease-in-out bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-4 py-2 rounded-md dark:text-gray-200 border h-28 focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20',
						className
					)}
					ref={ref}
					{...props}
				/>

				<FieldError name={props.name} />
			</label>
		)
	}
)
