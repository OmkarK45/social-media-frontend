import { useState } from 'react'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'

// TODO : look into this
export default function Toggle() {
	const [enabled, setEnabled] = useState(false)

	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={clsx(
				enabled ? 'bg-brand-600' : 'bg-gray-200',
				'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
			)}
		>
			<span className="sr-only">Use setting</span>
			<span
				aria-hidden="true"
				className={clsx(
					enabled ? 'translate-x-5' : 'translate-x-0',
					'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
				)}
			/>
		</Switch>
	)
}
