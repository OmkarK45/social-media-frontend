import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import ReactGiphySearchbox from 'react-giphy-searchbox'
import { AiOutlineGif } from 'react-icons/ai'

interface GIFPickerProps {
	className?: string
	onGIFPick: (item: any) => void
	disabled: boolean
}

export function GIFPicker({ className, onGIFPick, disabled }: GIFPickerProps) {
	return (
		<div className={clsx(className)}>
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							disabled={disabled}
							className={clsx(
								'rounded-full group hover:bg-brand-400 p-1',
								disabled && 'bg-gray-700 cursor-not-allowed'
							)}
						>
							<AiOutlineGif className="w-7 h-7 text-brand-500 group-hover:text-brand-100" />
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-in duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Popover.Panel className=" absolute z-10 bg-white dark:bg-gray-900 overflow-hidden  rounded-lg mt-3 sm:px-0 ">
								<div className="overflow-hidden shadow-lg">
									<ReactGiphySearchbox
										apiKey="OlrXcjSFLlBV6djyQinQv7gx0L8Gsumr"
										onSelect={(item) => onGIFPick(item)}
										masonryConfig={[
											{ columns: 3, imageWidth: 110, gutter: 5 },
											{ mq: '700px', columns: 3, imageWidth: 120, gutter: 5 },
										]}
									/>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	)
}
