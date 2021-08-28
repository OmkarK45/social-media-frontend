import { useFormContext } from 'react-hook-form'
import Button from '../Button'
import { Props as ButtonProps } from '../ButtonOrLink'
import Spinner from '../Spinner'

const FormSubmitButton = ({ children, ...props }: ButtonProps) => {
	const { formState } = useFormContext()

	return (
		<Button
			type="submit"
			rounded="md"
			active
			disabled={formState.isSubmitting}
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
