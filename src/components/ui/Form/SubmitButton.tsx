import { useFormContext } from 'react-hook-form'
import { Button } from '../Button'
import { Props as ButtonProps } from '../Button'
import Spinner from '../Spinner'

const FormSubmitButton = ({ children, disabled, ...props }: ButtonProps) => {
	const { formState } = useFormContext()

	return (
		<Button
			type="submit"
			rounded="md"
			disabled={formState.isSubmitting || disabled}
			{...props}
		>
			{formState.isSubmitting && (
				<Spinner className="h-4 w-4 mr-3 text-white" />
			)}
			{children}
		</Button>
	)
}

export default FormSubmitButton
