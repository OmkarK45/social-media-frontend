import { useRouter } from 'next/router'
import { HiOutlineSearch } from 'react-icons/hi'
import { z } from 'zod'
import Form, { useZodForm } from '~/components/ui/Form/Form'
import { Input } from '~/components/ui/Input'

const SearchSchema = z.object({
	query: z.string().optional(),
})

export function SearchBar() {
	const form = useZodForm({
		schema: SearchSchema,
	})

	const router = useRouter()

	return (
		<div className="w-full">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
					<HiOutlineSearch
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</div>
				<Form
					form={form}
					onSubmit={(values) => {
						if (values.query?.startsWith('#')) {
							const query = values.query.slice(1)
							router.push(`/search?query=${query}&type=hashtag`)
						} else {
							router.push(`/search?query=${values.query}&type=user`)
						}
					}}
				>
					<Input
						noLabel
						label="Search"
						{...form.register('query')}
						className="block w-full text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
						placeholder="Search Users, #Hashtags"
					/>
				</Form>
			</div>
		</div>
	)
}
