import { ComponentProps, forwardRef } from 'react'
import { FieldError } from '~/components/ui/Form/Form'
interface Props extends ComponentProps<'input'> {
	label: string
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{ label, type = 'text', ...props },
	ref
) {
	return (
		<label>
			<span className="block text-sm font-medium text-white mb-2">{label}</span>
			<input
				className="w-full bg-gray-800 border border-opacity-40 focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:cursor-not-allowed"
				type={type}
				ref={ref}
				{...props}
			/>

			<FieldError name={props.name} />
		</label>
	)
})
